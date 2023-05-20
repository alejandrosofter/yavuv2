import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from "react-instantsearch-dom";

const appId = process.env.ALGOLIA_APP_ID;
const apiKey = process.env.ALGOLIA_API_KEY;
const searchClient = algoliasearch(appId, apiKey);

const Hit = ({ hit }) => {
  if (hit)
    return (
      <span>
        <Highlight attribute="titular" hit={hit} tagName="mark" />
      </span>
    );
};

const AlgoliaSearch = () => (
  <InstantSearch indexName="cuentasCbu" searchClient={searchClient}>
    <SearchBox />
    <Hits hitComponent={Hit} />
  </InstantSearch>
);

export default AlgoliaSearch;
