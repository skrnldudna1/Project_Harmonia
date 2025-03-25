// 📂 src/data/posts.ts
export const dummyPosts = [
    { id: 1, title: "주황 빛 ", name: "우수희", image: "/images/A/A1.jpg" },
    { id: 2, title: "웃음", name: "곰수희", image: "/images/A/A3.jpg" },
    { id: 3, title: "딸기맛", name: "후라", image: "/images/A/A25.jpg" },
    { id: 4, title: "여름이였다", name: "하늘", image: "/images/A/A9.jpg" },
    { id: 6, title: "프린스", name: "창달", image: "/images/B/B2.jpg" },
    { id: 7, title: "Happy", name: "인연", image: "/images/B/B20.jpg" },
    { id: 8, title: "lon", name: "담배맛", image: "/images/B/B14.jpg" },
    { id: 9, title: "헤에에",name: "UOUO", image: "/images/B/B5.jpg" },



      // 하단 데이터
      { id: 10, title: "햇살", name: "소희", image: "/images/A/A23.jpg" },
      { id: 11, title: "구름", name: "지윤", image: "/images/A/A17.jpg" },
      { id: 12, title: "바람", name: "현우", image: "/images/A/A4.jpg" },
      { id: 13, title: "노을", name: "세진", image: "/images/A/A12.jpg" },
      { id: 14, title: "겨울", name: "수민", image: "/images/A/A18.jpg" },
      { id: 15, title: "바다", name: "태호", image: "/images/B/B16.jpg" },
      { id: 16, title: "강아지", name: "윤아", image: "/images/B/B8.jpg" },
      { id: 17, title: "달빛", name: "도윤", image: "/images/B/B12.jpg" },
      { id: 18, title: "추억", name: "하람", image: "/images/B/B19.jpg" },
      { id: 19, title: "밤하늘", name: "지수", image: "/images/C/C10.jpg" },
      { id: 20, title: "별빛", name: "예린", image: "/images/C/C11.jpg" },

      
  ];

  export const fetchPostById = async (id: number): Promise<Post | null> => {
    try {
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) throw new Error("Failed to fetch post");
      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  