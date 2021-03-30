import SvgIcon from "@material-ui/core/SvgIcon";
import { ReactComponent as BrandIco } from "./cubes-solid.svg";
import { ReactComponent as CatalogueIco } from "./book-solid.svg";
import { ReactComponent as ProviderIco } from "./truck-loading-solid.svg";
import { ReactComponent as EntryIco } from "./chevron-circle-left-solid.svg";
import { ReactComponent as ExitIco } from "./chevron-circle-right-solid.svg";

export function BrandIcon() {
  return (
    <SvgIcon>
      <BrandIco />
    </SvgIcon>
  );
}

export function CatalogueIcon() {
  return (
    <SvgIcon>
      <CatalogueIco />
    </SvgIcon>
  );
}

export function ProviderIcon() {
  return (
    <SvgIcon>
      <ProviderIco />
    </SvgIcon>
  );
}

export function EntryIcon() {
  return (
    <SvgIcon>
      <EntryIco />
    </SvgIcon>
  );
}

export function ExitIcon() {
    return (
      <SvgIcon>
        <ExitIco />
      </SvgIcon>
    );
  }
