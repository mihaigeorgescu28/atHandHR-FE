import { createElement, FC, forwardRef } from "react";
import {
  Accordion,
  Alert,
  Badge,
  Button,
  Card,
  Dropdown,
  DropdownButton,
  Form,
  SplitButton,
  BreadcrumbProps,
  BreadcrumbItem,
  ButtonProps,
  ButtonGroup,
  Col,
  Row,
  Table,
  ProgressBar,
  Carousel,
  ListGroup,
  Modal,
  ToggleButton,
  ButtonToolbar,
  InputGroup,
  Nav,
  CardGroup,
  Tabs,
  Tab,
  NavDropdown,
  Navbar,
  Pagination,
} from "react-bootstrap";

interface SABreadcrumbProps extends BreadcrumbProps {
  type?: "dot" | "line";
}

const Breadcrumb: FC<SABreadcrumbProps> = forwardRef(
  ({ as: Component = "nav", listProps, label, type, children, ...props }, ref) => {
    return createElement(Component, {
      "aria-label": label,
      ref,
      ...props,
      children: createElement("ol", {
        ...listProps,
        className: `breadcrumb ${listProps ? listProps.className : ""} ${
          type === "line" ? "breadcrumb-line" : type === "dot" ? "breadcrumb-dot" : ""
        }`,
        children,
      }),
    });
  }
);

//@ts-ignore
interface SAButtonProps extends ButtonProps {
  size?: "lg" | "sm" | "xs";
  hasIcon?: boolean;
  hasIconText?: boolean;
  social?:
    | "facebook"
    | "twitter"
    | "instagram"
    | "youtube"
    | "github"
    | "linkedin"
    | "vimeo"
    | "dribbble"
    | "pinterest"
    | "flickr"
    | "bitbucket"
    | "outline-facebook"
    | "outline-twitter"
    | "outline-instagram"
    | "outline-youtube"
    | "outline-github"
    | "outline-linkedin"
    | "outline-vimeo"
    | "outline-dribbble"
    | "outline-pinterest"
    | "outline-flickr"
    | "outline-bitbucket";
}

export const SAButton: FC<SAButtonProps> = ({
  size,
  variant,
  hasIcon,
  hasIconText,
  social,
  children,
  className,
  ...props
}) => {
  let _className = className ?? "";
  let _variant = variant;
  if (size === "xs") {
    _className += " btn-xs";
  }
  if (hasIcon) {
    _className += " btn-icon";
  }
  if (hasIconText) {
    _className += " btn-icon-text";
  }
  if (social) {
    _className += ` btn-${social}`;
    _variant = "";
  }

  return (
    //@ts-ignore
    <Button size={size} variant={_variant} className={_className} {...props}>
      {children}
    </Button>
  );
};

export const SAAccordion = Accordion;
export const SAAlert = Alert;
export const SABadge = Badge;
export const SABreadcrumb = Object.assign(Breadcrumb, { Item: BreadcrumbItem });
export const SACard = Card;
export const SADropdown = Dropdown;
export const SADropdownButton = DropdownButton;
export const SAForm = Form;
export const SASplitButton = SplitButton;
export const SAButtonGroup = ButtonGroup;
export const SACol = Col;
export const SARow = Row;
export const SATable = Table;
export const SAProgressBar = ProgressBar;
export const SACarousel = Carousel;
export const SAListGroup = ListGroup;
export const SAModal = Modal;
export const SAToggleButton = ToggleButton;
export const SAButtonToolbar = ButtonToolbar;
export const SAInputGroup = InputGroup;
export const SANav = Nav;
export const SACardGroup = CardGroup;
export const SATabs = Tabs;
export const SATab = Tab;
export const SANavDropdown = NavDropdown;
export const SANavbar = Navbar;
export const SAPagination = Pagination;
