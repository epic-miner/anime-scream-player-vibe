
import VideoPlayer from "@/components/VideoPlayer";

const Index = () => {
  return (
    <div className="min-h-screen bg-anime-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <VideoPlayer />
          <div className="mt-6 text-white">
            <h1 className="text-2xl font-bold">Attack on Titan</h1>
            <p className="text-anime-gray mt-2">Season 4 Episode 28 - "The Dawn of Humanity"</p>
            <p className="mt-4 text-sm text-anime-gray">
              As the world turns against them, the Scouts must face the truth about what freedom means for the people of Paradis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
