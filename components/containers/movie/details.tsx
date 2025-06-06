import { format } from 'date-fns';
import { Poster } from '@/components/common/poster';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { tmdb } from '@/lib/tmdb';

const DetailsContainer = async ({ data, id, embed }: any) => {
  const trailers = (await tmdb.videos('movie', id)).results.filter(
    (video) => video.type === 'Trailer' && video.site === 'YouTube',
  );

  return (
    <>
      <div
        className={cn(
          'bg-muted h-[30dvh] w-full overflow-hidden border shadow-sm md:rounded-lg lg:h-[55dvh]',
          embed ? 'max-h-[20vh] md:max-h-[50vh]' : undefined,
        )}
      >
        <div
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${data.backdrop_path}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="h-full w-full brightness-50"
          data-testid="banner"
        />
      </div>

      <div className="mx-auto my-8 max-w-4xl space-y-8 p-4 md:space-y-12 md:p-0">
        <main className="flex flex-col gap-4 md:flex-row">
          <aside className="-mt-24 w-full space-y-2 md:-mt-32 md:w-1/3">
            <Poster url={data.poster_path} alt={data.title} />
          </aside>

          <article className="flex w-full flex-col gap-2 md:w-2/3">
            {data.release_date && (
              <span className="text-muted-foreground text-xs">
                {format(new Date(data.release_date), 'PPP', {})}
              </span>
            )}
            <h1 className="text-lg font-bold md:text-4xl">{data.title}</h1>
            <div className="flex flex-wrap items-center gap-2">
              {data.genres.length > 0 && (
                <>
                  {data.genres.map((genre: any) => {
                    return (
                      <Badge key={genre.id} variant="outline" className="whitespace-nowrap">
                        {genre.name}
                      </Badge>
                    );
                  })}

                  <Separator orientation="vertical" className="h-6" />
                </>
              )}

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge>{data.vote_average.toFixed(1)}</Badge>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>{data.vote_count} votes</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-muted-foreground text-xs leading-5 md:text-sm md:leading-6">
              {data.overview}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/movie/watch/${id}`}>
                <Button className="px-6 py-3 text-lg whitespace-nowrap">
                  <Play className="mr-1.5" size={12} />
                  Watch
                </Button>
              </Link>

              {trailers.length > 0 && (
                <Link href={`https://www.youtube.com/watch?v=${trailers[0].key}`} target="_blank">
                  <Badge variant="outline" className="cursor-pointer whitespace-nowrap">
                    <Play className="mr-1.5" size={12} />
                    Trailer
                  </Badge>
                </Link>
              )}
            </div>
          </article>
        </main>
      </div>
    </>
  );
};

export default DetailsContainer;
