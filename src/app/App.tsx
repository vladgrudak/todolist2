import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useAppSelector } from "@/common/hooks"
import { selectThemeMode } from "./app-selector"
import { getTheme } from "@/common/theme"
import { Header } from "@/common/components/Header/Header"
import { Main } from "@/app/Main"
import styles from "./App.module.css"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.app}>
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  )
}
