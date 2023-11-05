<?php

namespace App\Http\Controllers\ContentControl;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Authors;
use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class Content extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['articles'] = Article::select('id', 'category_id', 'title', 'image', 'content', 'hit', 'status', 'slug', 'created_at', 'updated_at')
            ->addSelect(['category_name' => Category::select('name')
                ->whereColumn('id', 'articles.category_id')])->addSelect(['category_slug' => Category::select('slug')
                ->whereColumn('id', 'articles.category_id')])->addSelect(['author_name' => Authors::select('name')
                ->whereColumn('id', 'articles.authors_id')])->addSelect(['author_surname' => Authors::select('surname')
                ->whereColumn('id', 'articles.authors_id')])
            ->orderBy('created_at', 'DESC')
            ->Paginate(12);
        return Inertia::render('Dashboard/Dashboard', ['data' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['categories'] = Category::all();
        $data['authors'] = Authors::all();
        return Inertia::render('Dashboard/Content', ['data' => $data]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'min:3',
            'image' => 'image|mimes:jpeg,jpg,png,webp|max:2097152'
        ]);

        $article = new Article;
        $article->title = $request->title;
        $article->category_id = $request->category;
        $article->authors_id = $request->author;
        $article->content = $request->content;
        $article->slug = Str::slug($request->title);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = Str::slug($request->title) . '.' . $image->getClientOriginalExtension();
            $path = 'uploads/' . $imageName;
            Storage::disk('local')->put('public/' . $path, file_get_contents($image));
            $article->image = $path;
        }
        $article->save();
        return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        $data["articles"] = Article::findOrFail($id);

        // dd($article);
        $data['categories']  = Category::all();
        $data["authors"] = Authors::all();
        return Inertia::render('Dashboard/Content', ['data' => $data]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $request->validate([
            'title' => 'min:3',
            'image' => 'image|mimes:jpeg,jpg,png,webp|max:2097152'
        ]);

        $article = Article::findOrFail($id);
        $article->title = $request->title ?? $article->title;
        $article->category_id = $request->category ?? $article->category_id;
        $article->authors_id = $request->author ?? $article->category_id;
        $article->content = $request->content ?? $article->content;
        $article->slug = Str::slug($request->title);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = Str::slug($request->title) . '.' . $image->getClientOriginalExtension();
            $path = 'uploads/' . $imageName;
            Storage::disk('local')->put('public/' . $path, file_get_contents($image));
            $article->image = $path;
        }
        $article->save();
        return redirect()->route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $article = Article::find($id);
        if (File::exists($article->image)) {
            File::delete(public_path($article->image));
        }
        $article->forceDelete();
        return redirect()->route("dashboard");
    }
}
