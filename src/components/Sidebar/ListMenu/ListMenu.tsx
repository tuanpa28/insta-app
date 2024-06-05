'use client';

import { DropdownDisplay } from '@/components/common/display';
import { useState } from 'react';
import { NavLinkProps } from '../Sidebar';
import MenuItem from './MenuItem';

const ListMenu = ({ items }: { items: NavLinkProps[] }) => {
  const [active, setActive] = useState<string>('');

  return (
    <ul className='font-medium'>
      {items.map((item, i) => {
        if (item.dropdown) {
          return (
            <DropdownDisplay
              key={i}
              trigger={<MenuItem item={item} active={active} onSetActive={setActive} />}
            >
              {item.dropdown}
            </DropdownDisplay>
          );
        }
        return <MenuItem item={item} active={active} onSetActive={setActive} key={i} />;
      })}
    </ul>
  );
};

export default ListMenu;
