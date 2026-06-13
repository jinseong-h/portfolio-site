// Default works extracted from the user's old portfolio.
// We split them logically into Long-form and Short-form categories to populate the portfolio initially.
const DEFAULT_VIDEOS = [
  {
    id: "hU8pjV_jhOc",
    title: "'후지필름' 감독 인터뷰 영상",
    description: "편집 뿐만 아니라 촬영도 했던 인터뷰 영상 입니다.",
    youtubeUrl: "https://www.youtube.com/watch?v=hU8pjV_jhOc",
    category: "longform",
    createdAt: 1718250000000
  },
  {
    id: "vczru0_aSOI",
    title: "유튜브 '이안'님, 정보성 영상",
    description: "정보 전달을 위한 담백한 편집의 영상입니다.",
    youtubeUrl: "https://www.youtube.com/watch?v=vczru0_aSOI",
    category: "longform",
    createdAt: 1718210000000
  },
  {
    id: "WYzeUvPLYbc",
    title: "유튜브 '배룡', 게임 스토리 소개 영상",
    description: "실사 촬영본 없이도 영상 제작이 가능합니다.",
    youtubeUrl: "https://www.youtube.com/watch?v=WYzeUvPLYbc",
    category: "longform",
    createdAt: 1718230000000
  },
  {
    id: "NNIEPLWvaFQ",
    title: "유튜브 '셀러살롱' 정보성 영상",
    description: "정보 전달을 위한 영상입니다.",
    youtubeUrl: "https://www.youtube.com/watch?v=NNIEPLWvaFQ",
    category: "longform",
    createdAt: 1718220000000
  },
  {
    id: "f1TLQoQbE2U",
    title: "유튜브 '이상욱', 인테리어 정보성 영상",
    description: "인테리어에 관한 정보를 전달하는 영상입니다.",
    youtubeUrl: "https://www.youtube.com/watch?v=f1TLQoQbE2U",
    category: "longform",
    createdAt: 1718240000000
  },
  {
    id: "I--gsPN3pc4",
    title: "빠른 템포의 영상 제작",
    "description": "다양한 효과와 빠른 템포로 집중력을 가져오는 스타일의 영상 제작입니다.",
    youtubeUrl: "https://www.youtube.com/watch?v=I--gsPN3pc4",
    category: "longform",
    createdAt: 1718260000000
  },
  {
    id: "Ergx1xNWayY",
    title: "게임 쇼츠",
    description: "",
    youtubeUrl: "https://youtube.com/shorts/Ergx1xNWayY?feature=share",
    category: "shortform",
    createdAt: 1718270000000
  },
  {
    id: "gaSh3OeqHCU",
    title: "프렌차이즈 홍보용 쇼츠",
    description: "",
    youtubeUrl: "https://youtube.com/shorts/gaSh3OeqHCU?feature=share",
    category: "shortform",
    createdAt: 1718280000000
  },
  {
    id: "MeQ-yE8zV4s",
    title: "롱폼에서 쇼츠로",
    description: "기존 제작된 롱폼 영상에서 주요 영상을 편집하여 완성한 쇼츠 영상입니다.",
    youtubeUrl: "https://youtube.com/shorts/MeQ-yE8zV4s?feature=share",
    category: "shortform",
    createdAt: 1718290000000
  },
  {
    id: "kFz9B1sNNBw",
    title: "빠른 템포의 쇼츠 영상",
    description: "대본만 전달 받아 나레이션 부터 모두 제작한 숏폼 영상입니다",
    youtubeUrl: "https://youtube.com/shorts/kFz9B1sNNBw?feature=share",
    category: "shortform",
    createdAt: 1718300000000
  },
  {
    id: "1g4FdRgZPd0",
    title: "다양한 연출의 숏폼 영상",
    description: "롱폼에서 주요 장면을 다양한 연출로 제작한 숏폼 영상입니다.",
    youtubeUrl: "https://youtube.com/shorts/1g4FdRgZPd0?feature=share",
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
