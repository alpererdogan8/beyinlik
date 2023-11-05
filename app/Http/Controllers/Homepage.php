<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Authors;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class Homepage extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['articles'] = Article::select('id', 'category_id', 'title', 'image', 'content', 'hit', 'status', 'slug', 'created_at', 'updated_at')
            ->addSelect(['category_name' => Category::select('name')
                ->whereColumn('id', 'articles.category_id')])
            ->orderBy('created_at', 'DESC')
            ->Paginate(12);
        $data['categories'] = Category::orderBy('id', 'ASC')->get();
        return Inertia::render('Main', ['data' => $data]);
    }

    public function single($category, $slug)
    {
        $category = Category::whereSlug($category)->first() ?? abort(403, 'Böyle bir kategori yok');
        $data['article'] = Article::whereSlug($slug)->addSelect(['category_name' => Category::select('name')
            ->whereColumn('id', 'articles.category_id')])->addSelect(['author_name' => Authors::select('name')
            ->whereColumn('id', 'articles.authors_id')])->addSelect(['author_surname' => Authors::select('surname')
            ->whereColumn('id', 'articles.authors_id')])->get() ?? abort(403, 'Bilginin içinde kayboldun sanırım,fakat böyle bir veri yok  :) ');
        $data['categories'] = Category::orderBy('id', 'ASC')->get();
        return Inertia::render('Content', ['data' => $data]);
    }
    public function category($slug)
    {
        $category = Category::whereSlug($slug)->first() ?? abort(403, 'Böyle bir kategori yok');
        $data['articles'] = Article::where('category_id', $category->id)->addSelect(['category_name' => Category::select('name')
            ->whereColumn('id', 'articles.category_id')])->orderBy('created_at', 'DESC')->paginate(12);
        $data['categories'] = Category::orderBy('id', 'ASC')->get();
        return Inertia::render('Main', ['data' => $data]);
    }
    public function showImage($image)
    {

        $imagePath = 'public/uploads/' . $image;
        if (Storage::exists($imagePath)) {
            $file = Storage::get($imagePath);
            $mimeType = Storage::mimeType($imagePath);
            return response($file, 200)
                ->header('Content-Type', $mimeType);
        } else {
            abort(404, 'Resim bulunamadı');
        }
    }

    /**
     * Display the specified resource.
     */
    // public function show(string $id)
    // {
    //     return Inertia::render('Welcome', ['database' => $id]);
    // }
}
