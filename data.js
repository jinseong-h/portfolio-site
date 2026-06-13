// Default works extracted from the user's old portfolio.
// We keep this as a local fallback in case Supabase API fails.
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
    description: "다양한 효과와 빠른 템포로 집중력을 가져오는 스타일의 영상 제작입니다.",
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

// Supabase API Credentials
const SUPABASE_URL = "https://zyqqbwzdxunbngehdoqi.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5cXFid3pkeHVuYm5nZWhkb3FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDU1NjAsImV4cCI6MjA5NjkyMTU2MH0.Cry86TJ7FkoQpS_hmJgYZ4S7H8XkNsDaqbt4KI4UFqA";

const PortfolioData = {
  // Asynchronous fetch wrapper for Supabase REST API
  async _fetch(path, options = {}) {
    const headers = {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      ...options.headers
    };
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { ...options, headers });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Supabase error: ${errText || response.statusText}`);
    }
    if (options.method === "DELETE") return true;
    try {
      return await response.json();
    } catch(e) {
      return null;
    }
  },

  // Fetch all videos from Supabase, ordered by createdAt descending
  async getAllVideos() {
    try {
      const videos = await this._fetch("videos?select=*&order=createdAt.desc");
      if (videos && Array.isArray(videos)) {
        return videos;
      }
      return DEFAULT_VIDEOS;
    } catch (e) {
      console.warn("Failed to fetch from Supabase. Falling back to default list.", e);
      return DEFAULT_VIDEOS;
    }
  },

  // Get filtered videos by category
  async getVideosByCategory(category) {
    const all = await this.getAllVideos();
    return all.filter(v => v.category === category);
  },

  // Save new video listing
  async addVideo(videoData) {
    const videoId = this.extractYoutubeId(videoData.youtubeUrl);
    if (!videoId) {
      throw new Error("올바른 유튜브 링크가 아닙니다.");
    }
    
    const newVideo = {
      id: videoId + "_" + Date.now(),
      title: videoData.title || "제목 없음",
      description: videoData.description || "",
      youtubeUrl: videoData.youtubeUrl,
      category: videoData.category || "longform",
      createdAt: Date.now()
    };
    
    await this._fetch("videos", {
      method: "POST",
      body: JSON.stringify(newVideo)
    });
    return newVideo;
  },

  // Delete video listing by ID
  async deleteVideo(id) {
    await this._fetch(`videos?id=eq.${id}`, {
      method: "DELETE"
    });
    return true;
  },

  // Update video listing by ID
  async updateVideo(id, videoData) {
    const videoId = this.extractYoutubeId(videoData.youtubeUrl);
    if (!videoId) {
      throw new Error("올바른 유튜브 링크가 아닙니다.");
    }
    
    const updated = {
      title: videoData.title || "제목 없음",
      description: videoData.description || "",
      youtubeUrl: videoData.youtubeUrl,
      category: videoData.category || "longform"
    };

    await this._fetch(`videos?id=eq.${id}`, {
      method: "PATCH",
      body: JSON.stringify(updated)
    });
    return true;
  },

  // Swap position of video
  async moveVideo(id, direction) {
    const all = await this.getAllVideos();
    const targetVideo = all.find(v => v.id === id);
    if (!targetVideo) return;
    
    const category = targetVideo.category;
    // Get all videos in this category in their current sorted (DESC) order
    const catVideos = all.filter(v => v.category === category);
    const targetIndex = catVideos.findIndex(v => v.id === id);
    
    let swapIndex = -1;
    if (direction === 'up' && targetIndex > 0) {
      swapIndex = targetIndex - 1;
    } else if (direction === 'down' && targetIndex < catVideos.length - 1) {
      swapIndex = targetIndex + 1;
    }
    
    if (swapIndex !== -1) {
      const videoA = catVideos[targetIndex];
      const videoB = catVideos[swapIndex];
      
      const timeA = videoA.createdAt;
      const timeB = videoB.createdAt;
      
      // Update videoA's createdAt in DB
      await this._fetch(`videos?id=eq.${videoA.id}`, {
        method: "PATCH",
        body: JSON.stringify({ createdAt: timeB })
      });
      
      // Update videoB's createdAt in DB
      await this._fetch(`videos?id=eq.${videoB.id}`, {
        method: "PATCH",
        body: JSON.stringify({ createdAt: timeA })
      });
    }
    return true;
  },

  // Parse YouTube video ID from various formats
  extractYoutubeId(url) {
    if (!url) return null;
    url = url.trim();
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === 'youtu.be') {
        const id = urlObj.pathname.substring(1).split(/[?#]/)[0];
        if (id.length === 11) return id;
      }
      if (urlObj.pathname.includes('/shorts/')) {
        const parts = urlObj.pathname.split('/shorts/');
        const id = parts[1].split(/[?#]/)[0];
        if (id.length === 11) return id;
      }
      if (urlObj.pathname.includes('/embed/')) {
        const parts = urlObj.pathname.split('/embed/');
        const id = parts[1].split(/[?#]/)[0];
        if (id.length === 11) return id;
      }
      const vParam = urlObj.searchParams.get('v');
      if (vParam && vParam.length === 11) {
        return vParam;
      }
    } catch (e) {}

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
