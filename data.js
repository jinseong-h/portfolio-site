// Default works extracted from the user's old portfolio.
// We split them logically into Long-form and Short-form categories to populate the portfolio initially.
const DEFAULT_VIDEOS = [
  {
    id: "vczru0_aSOI",
    title: "감각적인 로드 트립 브이로그",
    description: "시네마틱한 톤앤매너와 부드러운 트랜지션을 사용하여 여정의 감성을 그대로 담아낸 롱폼 영상입니다.",
    youtubeUrl: "https://www.youtube.com/watch?v=vczru0_aSOI",
    category: "longform",
    createdAt: 1718210000000
  },
  {
    id: "NNIEPLWvaFQ",
    title: "신형 SUV 상세 리뷰 & 시승기",
    description: "정보 전달력을 높이기 위해 깔끔한 모션 그래픽 자막과 멀티카메라 편집을 적용한 전문 차량 리뷰 영상입니다.",
    youtubeUrl: "https://www.youtube.com/watch?v=NNIEPLWvaFQ",
    category: "longform",
    createdAt: 1718220000000
  },
  {
    id: "WYzeUvPLYbc",
    title: "데스크 셋업 & 테크 기기 가이드",
    description: "정교한 컷 편집과 사운드 디자인으로 테크 제품의 매력을 극대화한 영상입니다.",
    youtubeUrl: "https://www.youtube.com/watch?v=WYzeUvPLYbc",
    category: "longform",
    createdAt: 1718230000000
  },
  {
    id: "f1TLQoQbE2U",
    title: "일상 브이로그 - 조용한 주말의 기록",
    description: "시청자가 편안함을 느끼도록 자연스러운 컷 전환과 ASMR 효과음을 강조한 롱폼 영상입니다.",
    youtubeUrl: "https://www.youtube.com/watch?v=f1TLQoQbE2U",
    category: "longform",
    createdAt: 1718240000000
  },
  {
    id: "hU8pjV_jhOc",
    title: "홈쿠킹 - 이탈리안 전통 파스타 만들기",
    description: "요리 과정을 역동적이고 빠르게 편집하여 시청 지속 시간을 확보한 쿡방 영상입니다.",
    youtubeUrl: "https://www.youtube.com/watch?v=hU8pjV_jhOc",
    category: "longform",
    createdAt: 1718250000000
  },
  {
    id: "I--gsPN3pc4",
    title: "종합 게임 하이라이트 & 공략",
    description: "화려한 이펙트와 템포감 있는 편집으로 지루함을 없앤 게임 하이라이트 영상입니다.",
    youtubeUrl: "https://www.youtube.com/watch?v=I--gsPN3pc4",
    category: "longform",
    createdAt: 1718260000000
  },
  
  // Shorts (Short-form works)
  {
    id: "We970P-7c5I",
    title: "스마트폰 카메라 프로처럼 쓰는 꿀팁 3가지",
    description: "모바일 시청을 고려해 화면 가득 찬 레이아웃과 빠른 자막 전환을 적용한 숏폼 영상입니다.",
    youtubeUrl: "https://www.youtube.com/shorts/We970P-7c5I",
    category: "shortform",
    createdAt: 1718270000000
  },
  {
    id: "sfmYcE--Qls",
    title: "찰나의 여행 모먼트 - 제주도 편",
    description: "음악 비트에 맞춰 빠르게 전환되는 비주얼 중심의 숏폼 영상입니다.",
    youtubeUrl: "https://www.youtube.com/shorts/sfmYcE--Qls",
    category: "shortform",
    createdAt: 1718280000000
  },
  {
    id: "hQ1_JNCbOIo",
    title: "5분 완성 맛보장 자취 요리 레시피",
    description: "핵심 요리 과정만을 압축하여 시각적 몰입도를 높인 세로형 숏폼 영상입니다.",
    youtubeUrl: "https://www.youtube.com/shorts/hQ1_JNCbOIo",
    category: "shortform",
    createdAt: 1718290000000
  },
  {
    id: "ziiO01behIo",
    title: "조회수를 부르는 유튜브 인트로 연출법",
    description: "영상 기획/편집 꿀팁을 간결하게 전하는 정보성 세로형 영상입니다.",
    youtubeUrl: "https://www.youtube.com/shorts/ziiO01behIo",
    category: "shortform",
    createdAt: 1718300000000
  },
  {
    id: "o3PqbFV-6fQ",
    title: "트렌디한 유튜브 템플릿 모음 숏폼",
    description: "모션 그래픽 템플릿의 예시를 감각적인 음악과 조화시킨 숏폼 영상입니다.",
    youtubeUrl: "https://www.youtube.com/shorts/o3PqbFV-6fQ",
    category: "shortform",
    createdAt: 1718310000000
  }
];

// LocalStorage key name
const STORAGE_KEY = "jinseong_portfolio_videos";

const PortfolioData = {
  // Initialize videos in localStorage if empty, then return all videos
  getAllVideos() {
    let videos = localStorage.getItem(STORAGE_KEY);
    if (!videos) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_VIDEOS));
      return DEFAULT_VIDEOS;
    }
    try {
      return JSON.parse(videos);
    } catch (e) {
      console.error("Failed to parse stored videos. Resetting to default.", e);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_VIDEOS));
      return DEFAULT_VIDEOS;
    }
  },

  // Get filtered videos by category
  getVideosByCategory(category) {
    const all = this.getAllVideos();
    return all.filter(v => v.category === category);
  },

  // Save new video listing
  addVideo(videoData) {
    const all = this.getAllVideos();
    
    // Parse YouTube ID
    const videoId = this.extractYoutubeId(videoData.youtubeUrl);
    if (!videoId) {
      throw new Error("올바른 유튜브 링크가 아닙니다.");
    }
    
    const newVideo = {
      id: videoId + "_" + Date.now(), // Unique ID
      title: videoData.title || "제목 없음",
      description: videoData.description || "",
      youtubeUrl: videoData.youtubeUrl,
      category: videoData.category || "longform",
      createdAt: Date.now()
    };
    
    all.unshift(newVideo); // Add to the beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return newVideo;
  },

  // Delete video listing by ID
  deleteVideo(id) {
    let all = this.getAllVideos();
    all = all.filter(v => v.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return true;
  },

  // Update video listing by ID
  updateVideo(id, videoData) {
    const all = this.getAllVideos();
    const idx = all.findIndex(v => v.id === id);
    if (idx === -1) {
      throw new Error("영상을 찾을 수 없습니다.");
    }
    
    // Parse YouTube ID
    const videoId = this.extractYoutubeId(videoData.youtubeUrl);
    if (!videoId) {
      throw new Error("올바른 유튜브 링크가 아닙니다.");
    }
    
    all[idx].title = videoData.title || "제목 없음";
    all[idx].description = videoData.description || "";
    all[idx].youtubeUrl = videoData.youtubeUrl;
    all[idx].category = videoData.category || "longform";
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return all[idx];
  },

  // Move video up or down within its category
  moveVideo(id, direction) {
    const all = this.getAllVideos();
    const targetVideo = all.find(v => v.id === id);
    if (!targetVideo) return;
    
    const category = targetVideo.category;
    // Get all videos in this category in their current order
    const catVideos = all.filter(v => v.category === category);
    const targetIndex = catVideos.findIndex(v => v.id === id);
    
    if (direction === 'up') {
      if (targetIndex > 0) {
        // Swap with the previous video in the category
        const temp = catVideos[targetIndex];
        catVideos[targetIndex] = catVideos[targetIndex - 1];
        catVideos[targetIndex - 1] = temp;
      }
    } else if (direction === 'down') {
      if (targetIndex < catVideos.length - 1) {
        // Swap with the next video in the category
        const temp = catVideos[targetIndex];
        catVideos[targetIndex] = catVideos[targetIndex + 1];
        catVideos[targetIndex + 1] = temp;
      }
    }
    
    // Rebuild the full list preserving original slots of this category
    let catPtr = 0;
    const updatedAll = all.map(v => {
      if (v.category === category) {
        return catVideos[catPtr++];
      }
      return v;
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAll));
    return updatedAll;
  },

  // Parse YouTube video ID from various formats
  // Supported formats:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://youtube.com/shorts/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  extractYoutubeId(url) {
    if (!url) return null;
    
    // Trim spaces
    url = url.trim();
    
    // Try native URL parsing first for clean params
    try {
      const urlObj = new URL(url);
      
      // youtu.be/VIDEO_ID
      if (urlObj.hostname === 'youtu.be') {
        const id = urlObj.pathname.substring(1).split(/[?#]/)[0];
        if (id.length === 11) return id;
      }
      
      // shorts/VIDEO_ID
      if (urlObj.pathname.includes('/shorts/')) {
        const parts = urlObj.pathname.split('/shorts/');
        const id = parts[1].split(/[?#]/)[0];
        if (id.length === 11) return id;
      }
      
      // embed/VIDEO_ID
      if (urlObj.pathname.includes('/embed/')) {
        const parts = urlObj.pathname.split('/embed/');
        const id = parts[1].split(/[?#]/)[0];
        if (id.length === 11) return id;
      }
      
      // watch?v=VIDEO_ID
      const vParam = urlObj.searchParams.get('v');
      if (vParam && vParam.length === 11) {
        return vParam;
      }
    } catch (e) {
      // Fallback to regex if URL parsing fails (e.g. invalid protocol)
    }

    // Regexp fallback
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]{11})/;
    let match = url.match(regExp);
    if (match && match[2] && match[2].length === 11) {
      return match[2];
    }
    
    return null;
  },

  // Generate an embed URL
  getEmbedUrl(url) {
    const videoId = this.extractYoutubeId(url);
    if (!videoId) return "";
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&origin=https://www.youtube.com`;
  }
};
