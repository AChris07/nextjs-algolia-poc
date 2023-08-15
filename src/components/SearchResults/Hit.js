import Image from 'next/image'
import { Highlight } from 'react-instantsearch';

export default function Hit({ hit }) {
  return (
    <article>
      <Image src={hit.image} alt={hit.name} width={85} height={160} />
      <p>{hit.categories[0]}</p>
      <h1>
        <Highlight attribute="name" hit={hit} />
      </h1>
      <p>${hit.price}</p>
    </article>
  );
}
