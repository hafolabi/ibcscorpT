const toastOptions = {
  style: {
    padding: "8px 16px",
    minWidth: "max-content",
    maxWidth: "200px",
    borderRadius: 0,
    fontWeight: 500,
    fontSize: "14px",
    color: "#fff",
    zIndex: 999,
  },
  loading: {
    style: {
      background: "#FFCB2B",
      color: "#121220",
    },
    iconTheme: {
      primary: "#121220",
      secondary: "#FFCB2B",
    },
  },
  success: {
    style: {
      background: "#20BF55",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#20BF55",
    },
  },
  error: {
    style: {
      background: "#E01300",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#E01300",
    },
  },
  duration: 5000,
};

export default toastOptions;
