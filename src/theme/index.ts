import merge from 'lodash/merge';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { Direction, Theme, ThemeOptions } from '@mui/material';
import { THEMES } from 'src/constants';


interface ThemeConfig {
  direction?: Direction;
  responsiveFontSizes?: boolean;
  roundedCorners?: boolean;
  theme?: string;
}

const baseOptions: ThemeOptions = {
  direction: 'ltr',
  components: {
    MuiAvatar: {
      styleOverrides: {
        fallback: {
          height: '75%',
          width: '75%'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box'
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          height: '100%',
          width: '100%'
        },
        body: {
          height: '100%'
        },
        '#root': {
          height: '100%'
        },
        '#nprogress .bar': {
          zIndex: '2000 !important'
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6'
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: 'hidden'
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: '16px'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  },
  typography: {
    button: {
      fontWeight: 600
    },
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    h1: {
      fontWeight: 600,
      fontSize: '3.5rem'
    },
    h2: {
      fontWeight: 600,
      fontSize: '3rem'
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.25rem'
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem'
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem'
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem'
    },
    overline: {
      fontWeight: 600
    }
  }
};

const themesOptions: Record<string, ThemeOptions> = {
  [THEMES.LIGHT]: {
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&::placeholder': {
              opacity: 0.86,
              color: '#42526e'
            }
          }
        }
      }
    },
    palette: {
      action: {
        active: '#6b778c'
      },
      background: {
        default: '#f4f5f7',
        paper: '#ffffff'
      },
      error: {
        contrastText: '#ffffff',
        main: '#f44336'
      },
      mode: 'light',
      primary: {
        contrastText: '#ffffff',
        main: '#0088CB'
      },
      secondary: {
        contrastText: '#ffffff',
        main: '#f44336'
      },
      success: {
        contrastText: '#ffffff',
        main: '#4caf50'
      },
      text: {
        primary: '#172b4d',
        secondary: '#6b778c'
      },
      warning: {
        contrastText: '#ffffff',
        main: '#ff9800'
      }
    },
  },
  [THEMES.DARK]: {
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid rgba(145, 158, 171, 0.24)'
          }
        }
      }
    },
    palette: {
      background: {
        default: '#171c24',
        paper: '#222b36'
      },
      divider: 'rgba(145, 158, 171, 0.24)',
      error: {
        contrastText: '#ffffff',
        main: '#f44336'
      },
      mode: 'dark',
      primary: {
        contrastText: '#ffffff',
        main: '#688eff'
      },
      success: {
        contrastText: '#ffffff',
        main: '#4caf50'
      },
      text: {
        primary: '#ffffff',
        secondary: '#919eab'
      },
      warning: {
        contrastText: '#ffffff',
        main: '#ff9800'
      }
    },
  }
};


export const createCustomTheme = (config: ThemeConfig = {}): Theme => {
  let themeOptions = themesOptions[config.theme];

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    themeOptions = themesOptions[THEMES.LIGHT];
  }

  let theme = createTheme(
    merge(
      {},
      baseOptions,
      themeOptions,
      {
        ...(
          config.roundedCorners && {
            shape: {
              borderRadius: 16
            }
          }
        )
      },
      {
        direction: config.direction
      }
    )
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
