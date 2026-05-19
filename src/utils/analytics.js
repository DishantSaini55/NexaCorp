// Global session analytics - transparent, non-invasive with honeypot signals
export const sessionTracker = {
  sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  startTime: Date.now(),
  pages: [],
  currentPage: null,
  interactions: [],
  scrollDepth: {},
  // Honeypot signals
  keystrokeLog: [],
  mouseMovementDetected: false,
  pasteDetected: false,
  rightClickAttempted: false,
  specialCharsDetected: [],

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

  recordKeystroke(field, key, timestamp) {
    const last = this.keystrokeLog[this.keystrokeLog.length - 1];
    const gap = last ? timestamp - last.timestamp : 0;
    this.keystrokeLog.push({ field, key: key.length > 1 ? key : '*', gap, timestamp });
  },

  recordMouseMove() {
    this.mouseMovementDetected = true;
  },

  recordPaste(field) {
    this.pasteDetected = true;
    this.recordInteraction('paste_detected', field);
  },

  recordRightClick() {
    this.rightClickAttempted = true;
    this.recordInteraction('right_click', 'page');
  },

  recordSpecialChar(field, char) {
    this.specialCharsDetected.push({ field, char, timestamp: Date.now() });
  },

  getSessionData() {
    return {
      sessionId: this.sessionId,
      startTime: this.startTime,
      duration: Date.now() - this.startTime,
      pages: this.pages,
      totalInteractions: this.interactions.length,
      keystrokeLog: this.keystrokeLog,
      mouseMovementDetected: this.mouseMovementDetected,
      pasteDetected: this.pasteDetected,
      rightClickAttempted: this.rightClickAttempted,
      specialCharsDetected: this.specialCharsDetected,
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
