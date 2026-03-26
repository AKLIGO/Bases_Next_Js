import Link from "next/link";


export default async function NewsArticle({params, searchParams}:
    {params:Promise<{articleId:string}>, 
    searchParams:Promise<{lang?: "en" | "es" | "fr"}>}){

    const articleId=(await params).articleId;
    // const lang=(await searchParams).lang || "en";
    const {lang="en"}=await searchParams;
    return <>
          <h1>News Article {articleId}</h1>
          <p>Reading in {lang} language</p>

          <div>
            <Link href={`/articles/${articleId}?lang=en`}>Read in English</Link>
            <Link href={`/articles/${articleId}?lang=es`}>Read in Spanish</Link>
            <Link href={`/articles/${articleId}?lang=fr`}>Read in French</Link>
          </div>
    </>
}