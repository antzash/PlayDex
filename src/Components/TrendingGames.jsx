import React, { useEffect } from "react";

function TrendingGames({ gameList }) {
  useEffect(() => {
    console.log(gameList);
  }, []);

  return (
    <>
      <div className="mt-5">
        <h2 className="font-bold text-[30px] text-green-700">
          What's trending
        </h2>
      </div>
      <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-4 gap-4 mt-5">
        {gameList.map(
          (item, index) =>
            index < 4 && (
              <div
                key={item.id}
                className="bg-green-900 rounded-lg group hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer flex flex-col justify-between h-full"
              >
                <div>
                  <img
                    src={item.background_image}
                    alt={item.name}
                    className="h-[270px] rounded-t-lg object-cover bg-green-900"
                  />
                  {/* Adjusted padding and negative margin for h2 */}
                  <h2 className="text-[15px] text-white font-bold p-2">
                    {item.name}
                  </h2>
                </div>
                <div className="text-[10px] text-white font-light p-2">
                  {getPlatformString(item.parent_platforms)}
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}

export default TrendingGames;

function getPlatformString(platforms) {
  const platformStr = platforms.map((each) => each.platform.name).join(", ");
  if (platformStr.length > 30) {
    return platformStr.substring(0, 30) + "...";
  }
  return platformStr;
}
