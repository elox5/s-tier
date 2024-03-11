import './app.css'
import App from './App.svelte'

export interface TierData {
  name: string;
  color: string;
}

const app = new App({
  target: document.getElementById('app') as HTMLElement,
})


export default app
