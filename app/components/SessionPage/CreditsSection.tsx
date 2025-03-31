import { characterEpisodesList, staffMatch } from "@/utils/matchData";
import { GetCharacters, GetStaff } from "@/lib/getData";
import { Staff, Character, StaffMatch } from "@/utils/types";

export default async function CreditsSection({ epNum }: { epNum: number }) {
  const charData = await GetCharacters();
  const staffData = await GetStaff();
  // used so i don't keep calling the fetch function
  // const charJson = require("@/data/characterData.json");
  // const charData = charJson.data;

  // const episodeCast = [];
  // characterEpisodesList.forEach((member) => {
  //   const isInEpisode: boolean = member.episodes.includes(epNum);
  //   if (isInEpisode) {
  //     episodeCast.push(member);
  //   }
  // });
  // console.log(episodeCast);

  // creates an array of characters in current episode
  const episodeCast = characterEpisodesList.filter((member) =>
    member.episodes.includes(epNum)
  );
  // const charNames = episodeCast.map((character) => character.name);
  // console.log(episodeCast);

  // TODO: create a function to display all current ep positions of a staff member (if multiple available)
  const episodeDirector: StaffMatch[] = staffMatch.filter(
    (member: StaffMatch) => member.epDirector?.includes(epNum)
  );
  const episodeWriter: StaffMatch[] = staffMatch.filter((member: StaffMatch) =>
    member.screenwriter?.includes(epNum)
  );

  const castCompleteData = episodeCast.reduce(
    (accumulator: Character[], item) => {
      charData.forEach((member: Character) => {
        if (member.character.name === item.name) {
          accumulator.push(member);
        }
      });
      return accumulator;
    },
    []
  );
  // console.log(castCompleteData);

  const directorArr = episodeDirector.reduce((accumulator: Staff[], item) => {
    staffData.forEach((member: Staff) => {
      if (member.person.name === item.name) {
        accumulator.push(member);
      }
    });
    return accumulator;
  }, []);

  const screenwriterArr = episodeWriter.reduce((accumulator: Staff[], item) => {
    staffData.forEach((member: Staff) => {
      if (member.person.name === item.name) {
        accumulator.push(member);
      }
    });
    return accumulator;
  }, []);
  // console.log(screenwriterArr);

  // use lang to input desired language ; returns an array of indexes for VA's in given language
  function CastLanguage(lang: string) {
    const langIndex = castCompleteData.reduce(
      (accumulator: Array<number>, item) => {
        const index: number = item.voice_actors.findIndex(
          (i) => i.language === lang
        );
        accumulator.push(index);
        return accumulator;
      },
      []
    );

    return langIndex;
  }
  const jpnCastIndexArr = CastLanguage("Japanese");
  const engCastIndexArr = CastLanguage("English");
  // console.log(engCastIndexArr);

  function ParsePosition(dataArr: Staff[], pos: string) {
    const positionIndex = dataArr.reduce((accumulator: Array<number>, item) => {
      const index: number = item.positions.findIndex((i) => i === pos);
      accumulator.push(index);
      return accumulator;
    }, []);
    return positionIndex;
  }

  const dirIndex = ParsePosition(directorArr, "Episode Director");
  const writerIndex = ParsePosition(screenwriterArr, "Script");
  // "Director" , "Series Composition"
  // console.log(writerIndex);

  return (
    // <div className="grid grid-cols-3 grid-rows-1 gap-x-4">
    <div className="grid grid-cols-subgrid grid-rows-1 gap-4">
      <div className="col-start-1 col-end-2">
        <h2 className="font-bold">Staff</h2>
        <ul className="text-sm">
          <li className="grid grid-cols-2">
            <span>Watanabe, Shinichirou</span>
            <span className="text-neutral-600">Direction</span>
          </li>
          <li className="grid grid-cols-2">
            <span>{directorArr[0].person.name}</span>
            <span className="text-neutral-600">
              {directorArr[0].positions[dirIndex[0]]}
            </span>
          </li>
          <li className="grid grid-cols-2">
            <span>Nobumoto, Keiko</span>
            <span className="text-neutral-600">Series Composition</span>
          </li>
          {screenwriterArr.map((member, i) => (
            <li key={i} className="grid grid-cols-2">
              <span>{member.person.name}</span>
              <span className="text-neutral-600">
                {member.positions[writerIndex[i]]}
              </span>
            </li>
          ))}
          <li className="grid grid-cols-2">
            <span>Kawamoto, Toshihiro</span>
            <span className="text-neutral-600">Character Design</span>
          </li>
          <li className="grid grid-cols-2">
            <span>Yamane, Kimitoshi</span>
            <span className="text-neutral-600">Mechanical Design</span>
          </li>
          <li className="grid grid-cols-2">
            <span>Kanno, Yoko</span>
            <span className="text-neutral-600">Music</span>
          </li>
        </ul>
      </div>
      {/* <div className="col-start-2 col-end-3"> */}
      <div className="md:col-start-2 md:col-end-3 col-start-1 col-end-2">
        <h2 className="font-bold ">Japanese Cast</h2>
        <ul className="text-sm col-start2 col-end-3">
          {castCompleteData.map((member, i) => (
            <li key={i} className="grid grid-cols-2">
              <span className="">
                {/* {member.voice_actors[0].language === "Japanese"
                  ? member.voice_actors[0].person.name
                  : member.voice_actors[1].person.name} */}
                {/* {member.voice_actors[jpnCastIndexArr[i]].person.name} */}
                {jpnCastIndexArr[i] === -1
                  ? "None credited"
                  : member.voice_actors[jpnCastIndexArr[i]].person.name}
              </span>
              <span className="text-neutral-600">{member.character.name}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="col-start-3 col-end-4"> */}
      <div className="md:col-start-3 md:col-end-4 col-start-1 col-end-2">
        <h2 className="font-bold">English Cast</h2>
        <ul className="text-sm">
          {castCompleteData.map((member, i) => (
            <li key={i} className="grid grid-cols-2">
              <span className="">
                {engCastIndexArr[i] === -1
                  ? "None credited"
                  : member.voice_actors[engCastIndexArr[i]].person.name}
              </span>
              <span className="text-neutral-600">{member.character.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
