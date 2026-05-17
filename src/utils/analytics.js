// Global session analytics - transparent, non-invasive
export const sessionTracker = {
  sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  startTime: Date.now(),
  pages: [],
  currentPage: null,
  interactions: [],
  scrollDepth: {},

  recordPageView(page) {
    this.currentPage = page;
    this.pages.push({
      page,
      enteredAt: Date.now(),
      exitedAt: null,
      timeSpent: 0,
      scrollDepth: 0,
      interactions: []
    });
  },

  recordPageExit() {
    if (this.pages.length > 0) {
      const lastPage = this.pages[this.pages.length - 1];
      lastPage.exitedAt = Date.now();
      lastPage.timeSpent = lastPage.exitedAt - lastPage.enteredAt;
    }
  },

  recordInteraction(type, element, value = null) {
    this.interactions.push({
      type,
      element,
      value,
      timestamp: Date.now(),
      page: this.currentPage
    });
  },

  recordScrollDepth(depth) {
    if (this.pages.length > 0) {
      this.pages[this.pages.length - 1].scrollDepth = Math.max(
        this.pages[this.pages.length - 1].scrollDepth,
        depth
      );
    }
  },

  getSessionData() {
    return {
      sessionId: this.sessionId,
      startTime: this.startTime,
      duration: Date.now() - this.startTime,
      pages: this.pages,
      totalInteractions: this.interactions.length,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenSize: { width: window.innerWidth, height: window.innerHeight }
    };
  }
};

// Hook for tracking scroll depth
export const useScrollTracking = () => {
  const trackScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    sessionTracker.recordScrollDepth(scrollPercent);
  };

  return trackScroll;
};
