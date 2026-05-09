export type Project = {
  id: string;
  title: string;
  image: string;
  width: number;
  style: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    rotate?: string;
    zIndex?: number;
  };
};

export const projects: Project[] = [
  {
    id: "all-of-us-are-dead",
    title: "All of Us Are Dead",
    image: "https://picsum.photos/seed/project-01/300/450",
    width: 112,
    style: { top: "0%", left: "0%", rotate: "-1deg", zIndex: 2 },
  },
  {
    id: "goodbye-earth",
    title: "Goodbye Earth",
    image: "https://picsum.photos/seed/project-02/300/450",
    width: 112,
    style: { top: "0%", left: "12.5%", rotate: "1deg", zIndex: 3 },
  },
  {
    id: "our-time",
    title: "Our Time",
    image: "https://picsum.photos/seed/project-03/300/450",
    width: 112,
    style: { top: "0%", left: "25%", rotate: "-0.5deg", zIndex: 2 },
  },
  {
    id: "strong-girl-nam-soon",
    title: "Strong Girl Nam-soon",
    image: "https://picsum.photos/seed/project-04/300/450",
    width: 112,
    style: { top: "0%", left: "37.5%", rotate: "1.5deg", zIndex: 4 },
  },
  {
    id: "the-green-place",
    title: "The Green Place",
    image: "https://picsum.photos/seed/project-05/300/450",
    width: 112,
    style: { top: "0%", left: "50%", rotate: "-1.5deg", zIndex: 2 },
  },
  {
    id: "summer-rain",
    title: "Summer Rain",
    image: "https://picsum.photos/seed/project-06/300/450",
    width: 112,
    style: { top: "0%", left: "62.5%", rotate: "0.5deg", zIndex: 3 },
  },
  {
    id: "narco-saints",
    title: "Narco Saints",
    image: "https://picsum.photos/seed/project-07/300/450",
    width: 112,
    style: { top: "0%", left: "75%", rotate: "-1deg", zIndex: 2 },
  },
  {
    id: "crooks",
    title: "Crooks",
    image: "https://picsum.photos/seed/project-08/300/450",
    width: 112,
    style: { top: "0%", left: "87.5%", rotate: "1deg", zIndex: 3 },
  },
  {
    id: "helgoland",
    title: "Helgoland 513",
    image: "https://picsum.photos/seed/project-09/300/450",
    width: 112,
    style: { top: "25%", left: "0%", rotate: "1deg", zIndex: 3 },
  },
  {
    id: "korea-khitan-war",
    title: "Korea-Khitan War",
    image: "https://picsum.photos/seed/project-10/300/450",
    width: 112,
    style: { top: "25%", left: "12.5%", rotate: "-1deg", zIndex: 2 },
  },
  {
    id: "battle-at-lake-changjin",
    title: "The Battle at Lake Changjin",
    image: "https://picsum.photos/seed/project-11/300/450",
    width: 112,
    style: { top: "25%", left: "25%", rotate: "0.5deg", zIndex: 4 },
  },
  {
    id: "legend-of-anle",
    title: "Legend of Anle",
    image: "https://picsum.photos/seed/project-12/300/450",
    width: 112,
    style: { top: "25%", left: "37.5%", rotate: "-1.5deg", zIndex: 2 },
  },
  {
    id: "silver-and-the-book",
    title: "Silver and the Book of Dreams",
    image: "https://picsum.photos/seed/project-13/300/450",
    width: 112,
    style: { top: "25%", left: "50%", rotate: "1deg", zIndex: 3 },
  },
  {
    id: "little-women",
    title: "Little Women",
    image: "https://picsum.photos/seed/project-14/300/450",
    width: 112,
    style: { top: "25%", left: "62.5%", rotate: "-0.5deg", zIndex: 2 },
  },
  {
    id: "mai",
    title: "Mai",
    image: "https://picsum.photos/seed/project-15/300/450",
    width: 112,
    style: { top: "25%", left: "75%", rotate: "1.5deg", zIndex: 4 },
  },
  {
    id: "tiger",
    title: "Tiger",
    image: "https://picsum.photos/seed/project-16/300/450",
    width: 112,
    style: { top: "25%", left: "87.5%", rotate: "-1deg", zIndex: 2 },
  },
  {
    id: "those-years",
    title: "Those Years",
    image: "https://picsum.photos/seed/project-17/300/450",
    width: 112,
    style: { top: "50%", left: "0%", rotate: "-0.5deg", zIndex: 3 },
  },
  {
    id: "nguoi-mat-troi",
    title: "Nguoi Mat Troi",
    image: "https://picsum.photos/seed/project-18/300/450",
    width: 112,
    style: { top: "50%", left: "12.5%", rotate: "0.5deg", zIndex: 2 },
  },
  {
    id: "no-way-up",
    title: "No Way Up",
    image: "https://picsum.photos/seed/project-19/300/450",
    width: 112,
    style: { top: "50%", left: "25%", rotate: "-1deg", zIndex: 4 },
  },
  {
    id: "pop",
    title: "Pop",
    image: "https://picsum.photos/seed/project-20/300/450",
    width: 112,
    style: { top: "50%", left: "37.5%", rotate: "1.5deg", zIndex: 3 },
  },
  {
    id: "sieulua-sieulay",
    title: "Sieu Lua Sieu Lay",
    image: "https://picsum.photos/seed/project-21/300/450",
    width: 112,
    style: { top: "50%", left: "50%", rotate: "-0.5deg", zIndex: 2 },
  },
  {
    id: "maika",
    title: "Maika",
    image: "https://picsum.photos/seed/project-22/300/450",
    width: 112,
    style: { top: "50%", left: "62.5%", rotate: "1deg", zIndex: 4 },
  },
  {
    id: "tu-chien-tren-khong",
    title: "Tu Chien Tren Khong",
    image: "https://picsum.photos/seed/project-23/300/450",
    width: 112,
    style: { top: "50%", left: "75%", rotate: "-1.5deg", zIndex: 3 },
  },
  {
    id: "rum-so",
    title: "Rum So",
    image: "https://picsum.photos/seed/project-24/300/450",
    width: 112,
    style: { top: "50%", left: "87.5%", rotate: "1deg", zIndex: 2 },
  },
  {
    id: "turbulence",
    title: "Turbulence",
    image: "https://picsum.photos/seed/project-25/300/450",
    width: 112,
    style: { top: "75%", left: "0%", rotate: "1deg", zIndex: 3 },
  },
  {
    id: "ke-an-danh",
    title: "Ke An Danh",
    image: "https://picsum.photos/seed/project-26/300/450",
    width: 112,
    style: { top: "75%", left: "12.5%", rotate: "-1deg", zIndex: 2 },
  },
  {
    id: "agent-from-above",
    title: "Agent From Above",
    image: "https://picsum.photos/seed/project-27/300/450",
    width: 112,
    style: { top: "75%", left: "25%", rotate: "1.5deg", zIndex: 4 },
  },
  {
    id: "no-hit-wonder",
    title: "No Hit Wonder",
    image: "https://picsum.photos/seed/project-28/300/450",
    width: 112,
    style: { top: "75%", left: "37.5%", rotate: "-0.5deg", zIndex: 3 },
  },
];
