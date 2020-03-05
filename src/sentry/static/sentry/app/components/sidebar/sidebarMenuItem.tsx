import React from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/core';

import {Theme} from 'app/utils/theme';

import SidebarMenuItemLink, {SidebarMenuItemLinkProps} from './sidebarMenuItemLink';
import {OrgSummary} from './sidebarOrgSummary';

type Props = {
  children: React.ReactNode;
} & SidebarMenuItemLinkProps;

const SidebarMenuItem = ({to, children, ...props}: Props) => (
  <StyledSidebarMenuItemLink to={to} {...props}>
    <MenuItemLabel hasMenu={!to}>{children}</MenuItemLabel>
  </StyledSidebarMenuItemLink>
);

const menuItemStyles = (p: SidebarMenuItemLinkProps & {theme: Theme}) => css`
  color: ${p.theme.gray5};
  cursor: pointer;
  display: flex;
  font-size: ${p.theme.fontSizeMedium};
  line-height: 32px;
  padding: 0 ${p.theme.sidebar.menuSpacing};
  position: relative;
  transition: 0.1s all linear;
  ${!!p.to && 'overflow: hidden'};

  &:hover,
  &:active,
  &.focus-visible {
    background: ${p.theme.offWhite};
    color: ${p.theme.gray5};
    outline: none;
  }

  ${OrgSummary} {
    padding-left: 0;
    padding-right: 0;
  }
`;

const MenuItemLabel = styled('span')<{hasMenu?: boolean}>`
  flex: 1;
  ${p =>
    p.hasMenu
      ? css`
          margin: 0 -15px;
          padding: 0 15px;
        `
      : css`
          overflow: hidden;
        `};
`;

const StyledSidebarMenuItemLink = styled(SidebarMenuItemLink)`
  ${menuItemStyles}
`;

export {menuItemStyles};
export default SidebarMenuItem;
