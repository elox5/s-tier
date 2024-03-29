import './app.css'
import App from './App.svelte'

export interface TierData {
  name: string;
  color: string;
  index: number;
  list: ListData;
}

export interface ListData {
  images?: string[];
}

export interface TextEntryData {
  text: string;
  color: string;
}

const app = new App({
  target: document.getElementById('app') as HTMLElement,
})


export default app
