import { SpeedDial } from 'react-native-elements';
import { useState } from 'react';

export default function MainSpeedDial({isAdding, isSearching, setIsSearching, setIsAdding }) {
    const [open, setOpen]               = useState(false);


    const openNewItemForm = () => {
        setIsAdding(!isAdding);
    }

    const openSearchForm = () => {
        setIsSearching(!isSearching);
    }

    return (
      <SpeedDial
        isOpen={open}
        icon={{ name: 'edit', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          icon={{ name: 'add', color: '#fff' }}
          title="Add"
          onPress={openNewItemForm}
        />
        <SpeedDial.Action
          icon={{ name: 'search', color: '#fff' }}
          title="Search"
          onPress={openSearchForm}
        />
        <SpeedDial.Action
          icon={{ name: 'delete', color: '#fff' }}
          title="Delete"
          onPress={() => console.log('Delete Something')}
        />
      </SpeedDial>
    )
}