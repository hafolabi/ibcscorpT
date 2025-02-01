import type { ThemeConfig } from "antd";

export const antdTheme: ThemeConfig = {
  token: {
    controlOutline : 'none',
    colorPrimary : '#8576FF'
  },
  components: {
    Notification: {
    },
    Modal: {
      paddingContentHorizontal: 0, // Remove horizontal padding
      paddingContentVertical: 0,   // Remove vertical padding
    },
  },
};
