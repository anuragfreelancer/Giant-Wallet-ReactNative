import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { color } from '../constant';

interface DropdownItem {
  label: string;
  value: string;
  searchableText?: string; // Add this if you're using custom search
}

interface CustomDropdownProps {
  data: DropdownItem[];
  placeholder?: string;
  onSelect: (value: string) => void;
  leftIcon?: React.ReactNode;
  search?: boolean;
  onAddNewItem?: () => void; // Callback for when the "Add New" button is pressed
}

const NewDD: React.FC<CustomDropdownProps> = ({
  data,
  placeholder = 'Select',
  onSelect,
  leftIcon,
  search,
  onAddNewItem
}) => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const filtered = data.filter(item => {
        (item.searchableText?.toLowerCase().includes(text.toLowerCase()) ||
        (item.label?.toLowerCase().includes(text.toLowerCase())) ||
        (item.value && item.value.toString().toLowerCase().includes(text.toLowerCase()))
      )});
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  // Custom render for list items including the "Add New" button
  const renderItem = (item: DropdownItem, isLastItem: boolean) => {
    if (item.value === 'add-new') {
      return (
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => {
            onAddNewItem?.();
            setIsFocus(false);
            setSearchQuery('');
          }}
        >
          <Text style={styles.addButtonText}>+ Add New Item</Text>
        </TouchableOpacity>
      );
    }
    
    return (
      <View style={[styles.item, isLastItem && styles.lastItem]}>
        <Text style={styles.itemText}>{item.label}</Text>
      </View>
    );
  };

  // Add the "Add New" button to the filtered data when searching
  const dataWithAddButton = searchQuery 
    ? [...filteredData, { label: 'Add New Item', value: 'add-new' }]
    : filteredData;

  return (
    <View style={styles.container}>
      <View style={styles.innerWrapper}>
        {leftIcon && <View style={styles.iconWrapper}>{leftIcon}</View>}
        <Dropdown
          style={[
            styles.dropdown,
            isFocus && styles.focusedDropdown,
            leftIcon && { paddingLeft: 40 },
          ]}
          data={dataWithAddButton}
          labelField="label"
          valueField="value"
          placeholderStyle={{ color: color.grey }}
          placeholder={placeholder}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            if (item.value === 'add-new') {
              onAddNewItem?.();
            } else {
              setValue(item.value);
              onSelect(item.value);
            }
            setSearchQuery('');
          }}
          renderItem={(item, selected) => (
            renderItem(item, dataWithAddButton.indexOf(item) === dataWithAddButton.length - 1)
          )}
          itemTextStyle={styles.itemText}
          selectedTextStyle={styles.selectedText}
          containerStyle={styles.dropdownContainer}
          search={search}
          renderInputSearch={(props) => (
            <TextInput
              {...props}
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={handleSearch}
              autoCorrect={false}
              autoCapitalize="none"
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 15,
  },
  innerWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    zIndex: 10,
    left: 15,
  },
  dropdown: {
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#F7F8F8',
  },
  focusedDropdown: {},
  dropdownContainer: {
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 15,
    paddingVertical: 11,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemText: {
    fontSize: 16,
    color: 'black',
    lineHeight: 18,
  },
  selectedText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 18,
    marginLeft: 10
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    margin: 8,
  },
  addButton: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default NewDD;