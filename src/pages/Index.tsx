
import React from "react";
import VideoPlayer from "@/components/VideoPlayer";
import { Bookmark, Share2, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <VideoPlayer />
          
          <div className="mt-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold">One Punch Man</h1>
                <p className="text-gray-400 mt-1">Season 1 Episode 1 - "The Strongest Man"</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Bookmark className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-sm text-gray-300">
                Saitama is a hero who only became a hero for fun. After three years of "special" training, he's become so strong that he's practically invincible. In fact, he's too strong—even his mightiest opponents are taken out with a single punch. Now, the great seer Madame Shibabawa's prediction about the Earth being doomed seems to be coming true as the frequency of monster incidents escalates. Alongside Genos, his faithful disciple, Saitama begins his official hero duties as a member of the Hero Association, while Garou, a man utterly fascinated by monsters, makes his appearance.
              </p>
            </div>
            
            <div className="mt-4 flex items-center text-sm text-gray-400">
              <span className="mr-4">2,154,882 views</span>
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                <span>1,243 comments</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">More Episodes</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[2, 3, 4, 5, 6, 7, 8].map(episode => (
                  <div key={episode} className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                    <div className="aspect-video bg-gray-800 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">EP {episode}</span>
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium truncate">Episode {episode}</p>
                      <p className="text-xs text-gray-400">24 min</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
