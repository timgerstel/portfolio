import { Location } from 'history'

type Props = {
  location: Location;
}

export function locationToRoute({ location }: Props) {
  return {
    path: location.pathname,
    hash: location.hash,
    query: location.search
  }
}