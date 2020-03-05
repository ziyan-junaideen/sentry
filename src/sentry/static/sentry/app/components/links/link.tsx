import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router';
import {Location, LocationDescriptor} from 'history';

type ToLocationFunction = (location: Location) => LocationDescriptor;

export type LinkProps = {
  // Link content (accepted via string or components / DOM nodes)
  // TODO(Priscila): check why some components don't pass any children. Ex: CommitRow
  children?: React.ReactNode;
  // Optional URL
  to?: string | ToLocationFunction | LocationDescriptor;
  // Action to perform when clicked
  onClick?: (event: React.MouseEvent) => void | Promise<void>;
  // Styles applied to the component's root
  className?: string;
  // Specifies extra information about the element
  title?: string;
};

/**
 * A context-aware version of Link (from react-router) that falls
 * back to <a> if there is no router present
 */
class Link extends React.Component<LinkProps> {
  static contextTypes = {
    location: PropTypes.object,
  };

  render() {
    const {to = '#', ...props} = this.props;
    const isRouterPresent = this.context.location;

    if (isRouterPresent && to !== '#') {
      return <RouterLink to={to} {...props} />;
    }

    if (typeof to === 'string') {
      return <a href={to} {...props} />;
    }

    return null;
  }
}

export default Link;
