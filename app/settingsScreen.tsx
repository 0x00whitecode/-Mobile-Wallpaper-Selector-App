import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
  ScrollView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('High ( Best Quality )');

  const qualityOptions = [
    'High ( Best Quality )',
    'Medium ( Balanced )',
    'Low ( Data Saver )',
  ];

  const handleQualitySelect = (option: string) => {
    setSelectedQuality(option);
    setIsDropdownOpen(false);
  };

  return (

    <ScrollView style={styles.container}  contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.headerSection}>
             <Text style={styles.title}>
        <Text style={styles.titleSaved}>Settings</Text>
        </Text>
        <Text style={styles.mainSubText}>
          Customize your Wallpaper Studio experience
        </Text>
      </View>

      {/* Main Content Card */}
      <View style={styles.contentCard}>
        {/* Left Section - Settings Form */}


     


        <View style={styles.leftSection}>
          <Text style={styles.sectionTitle}>Wallpaper Setup</Text>
          <Text style={styles.sectionSubtitle}>
            Configure your wallpaper settings and enable auto-rotation
          </Text>

          {/* Image Quality Dropdown */}
          <View style={styles.settingCard}>
            <Text style={styles.label}>Image Quality</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setIsDropdownOpen(true)}
            >
              <Text style={styles.dropdownText}>{selectedQuality}</Text>
              <Text style={styles.arrow}>⌄</Text>
            </TouchableOpacity>
          </View>

          {/* Notification Toggle */}
          <View style={styles.settingCard}>
            <View style={styles.notificationCard}>
              <View style={styles.notificationRow}>
                <View style={styles.textColumn}>
                  <Text style={styles.label}>Notification</Text>
                  <Text style={styles.hint}>
                    Get notified about new wallpapers and updates
                  </Text>
                </View>
                <Switch
                  trackColor={{ false: '#E5E7EB', true: '#FFB43A' }}
                  thumbColor="#fff"
                  onValueChange={setIsEnabled}
                  value={isEnabled}
                  style={styles.switch}
                />
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveText}>Save Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Right Section - Phone Mockup */}
        <View style={styles.rightSection}>
          <View style={styles.phoneContainer}>
            <Svg width={259} height={525} viewBox="0 0 259 525">
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M217.7 0C238.718 5.45791e-05 255.756 17.0383 255.756 38.056V127.83C255.756 128.382 256.204 128.83 256.756 128.83H257.036C257.588 128.83 258.036 129.278 258.036 129.83V184.518C258.036 185.07 257.588 185.518 257.036 185.518H256.756C256.204 185.518 255.756 185.965 255.756 186.518V486.939C255.756 507.956 238.718 524.995 217.7 524.995H40.3352C19.3176 524.995 2.27935 507.956 2.27913 486.939V196.493C2.27913 195.941 1.83141 195.493 1.27913 195.493H1C0.447715 195.493 0 195.045 0 194.493V161.913C0 161.361 0.447715 160.913 1 160.913H1.27913C1.83141 160.913 2.27913 160.466 2.27913 159.913V156.385C2.27913 155.832 1.83141 155.385 1.27913 155.385H1C0.447715 155.385 0 154.937 0 154.385V121.833C0 121.281 0.447715 120.833 1 120.833H1.27913C1.83141 120.833 2.27913 120.386 2.27913 119.833V111.779C2.27913 111.227 1.83141 110.779 1.27913 110.779H1C0.447715 110.779 0 110.331 0 109.779V91.6675C0 91.1152 0.447715 90.6675 1 90.6675H1.27913C1.83141 90.6675 2.27913 90.2198 2.27913 89.6675V38.056C2.27935 17.0383 19.3176 5.45791e-05 40.3352 0H217.7Z"
                fill="#FAFAFA"
                stroke="#E5E5E5"
                strokeWidth="1"
              />
            </Svg>

            {/* Phone Content */}
            <View style={styles.mockupContent}>
              {/* Notch */}
              <View style={styles.notch} />
              <svg width="11" height="10" style={styles.notch1} viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg"> <ellipse cx="5.0628" cy="4.8147" rx="5.0628" ry="4.8147" fill="#2A2A2A"/> </svg>
     
              {/* Connection Status */}
              <View style={styles.connectionContainer}>
                <View style={styles.connectionBox}>
                  <Text style={styles.linkIcon}>🔗</Text>
                  <Text style={styles.connectedText}>Connected to device</Text>
                </View>
                <Text style={styles.disconnectText}>Click to disconnect</Text>
              </View>
                       <svg width="85" height="3" style={styles.notch2} viewBox="0 0 85 3" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="84.0515" height="2.45211" rx="1.22605" fill="#D9D9D9"/> </svg>

            </View>
          </View>
        </View>
      </View>

      {/* Dropdown Modal */}
      <Modal
        visible={isDropdownOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}
        >
          <View style={styles.dropdownModal}>
            <Text style={styles.dropdownModalTitle}>Select Image Quality</Text>
            {qualityOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dropdownOption,
                  selectedQuality === option && styles.dropdownOptionSelected,
                ]}
                onPress={() => handleQualitySelect(option)}
              >
                <Text
                  style={[
                    styles.dropdownOptionText,
                    selectedQuality === option && styles.dropdownOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {selectedQuality === option && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    contentContainer: {
    paddingBottom: 40, // adds space at bottom for smooth scrolling
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 60,
  },
  headerSection: {
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  mainHeader: {
    fontSize: 52,
    fontWeight: '700',
    color: '#FF9B5A',
    marginBottom: 8,
    letterSpacing: -1,
  },
  mainSubText: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '400',
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 64,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  leftSection: {
    flex: 1,
    maxWidth: 520,
    paddingRight: 80,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '400',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -0.5,
    fontFamily:'Poppins',
  },
  sectionSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 40,
    lineHeight: 22,
  },
  settingCard: {
    marginBottom: 28,
    backgroundColor:"#fffefeff",
    borderRadius:16,
    padding:20,
    borderWidth:1,
    borderColor:"#cacaca73",
    width:569,

  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  dropdown: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: '#fffefeff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 15,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  arrow: {
    fontSize: 20,
    color: '#111827',
    fontWeight: '600',
  },
  notificationCard: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 20,
    backgroundColor: '#fffefeff',
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textColumn: {
    flex: 1,
    paddingRight: 16,
  },
  hint: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
    lineHeight: 20,
  },
  switch: {
    transform: [{ scale: 1.1 }],
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 48,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  cancelText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#FFB43A',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    fontFamily:'Poppins',

  },
  saveText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  rightSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
  },
phoneContainer: {
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
 
  borderColor: '#ddddddff',
  borderRadius: 50,
  overflow: 'hidden', // keeps border visually inside
  backgroundColor: '#f1f1f1ff', // helps define the inside area
}
,
  mockupContent: {
    position: 'absolute',
    top: 50,
    left: 28,
    right: 28,
    bottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  
    
  },
 notch: {
  position: 'absolute',
  top: -30,
  width: 72.36,
  height: 19.86,
  backgroundColor: '#000000',
  borderRadius: 18,
  padding:3,
  borderWidth:3,
  borderColor:"#000"

},

notch1: {
  position: 'absolute',
  top: -28,
  left: '59%',          // start at the center of parent
  transform: [{ translateX: -60 }], // move toward left end (adjust -60 as needed)
  width: 15,            // give it width if needed
  height: 15,
},
notch2:{
  position: 'absolute',
  bottom:-30,
},
  title: { 
    fontSize: 60, 
    fontWeight: '500', 
    marginBottom: 8, 
    fontFamily: 'ClashDisplay' 
  },

  titleSaved: { color: '#FBB03B' },
  titleWallpapers: { color: '#FF6B6B' },


  connectionContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  connectionBox: {
    backgroundColor: '#CFFFC3',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  linkIcon: {
    fontSize: 16,
  },
  connectedText: {
    color: '#168200',
    fontFamily:'Poppins',
    fontSize: 12,
    fontWeight: '600',
  },
  disconnectText: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 12,
    fontWeight: '400',
    fontFamily:'Poppins',
  },
  // Dropdown Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: 320,
    maxHeight: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  dropdownModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily:'Poppins',
  },
  dropdownOption: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownOptionSelected: {
    backgroundColor: '#FEF3E2',
    borderWidth: 2,
    borderColor: '#FFB43A',
  },
  dropdownOptionText: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
    fontFamily:'Poppins',
  },
  dropdownOptionTextSelected: {
    color: '#111827',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 18,
    color: '#FFB43A',
    fontWeight: '700',
  },
});

export default SettingsScreen;