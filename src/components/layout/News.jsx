export default function News({ article }) {
    return (
        <a rel="noreferrer" href={article.url} target="_blank">
            <div className="flex items-center justify-between px-2 py-2 space-x-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition duration-500 ease-out rounded-md">
                <div className="space-y-0.5">
                    <h6 className="text-sm font-semibold">{article.title}</h6>
                    <p className="text-xs font-medium text-gray-500">
                        {article.source.name}
                    </p>
                </div>
                <img
                    className="rounded-xl"
                    width={90}
                    height={70}
                    src={article.urlToImage}
                    alt="article"
                />
            </div>
        </a>
    );
}
