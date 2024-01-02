import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { ActionCommandMenu } from './components/action-command-menu'
import { MainNav } from './components/main-nav'

export default function Home(): JSX.Element {
  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Button>New Button</Button>
        <ActionCommandMenu />
      </main>
    </>
  )
}
