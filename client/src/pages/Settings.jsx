import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Switch, FormControlLabel } from '@mui/material';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'My App',
    allowRegistration: true,
    maintenanceMode: false,
  });

  const handleChange = (field) => (event) => {
    setSettings({ ...settings, [field]: event.target.value });
  };

  const handleSwitchChange = (field) => (event) => {
    setSettings({ ...settings, [field]: event.target.checked });
  };

  const handleSave = () => {
    // Save settings (placeholder)
    console.log('Settings saved:', settings);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <TextField
        label="Site Name"
        value={settings.siteName}
        onChange={handleChange('siteName')}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={
          <Switch
            checked={settings.allowRegistration}
            onChange={handleSwitchChange('allowRegistration')}
          />
        }
        label="Allow User Registration"
      />
      <FormControlLabel
        control={
          <Switch
            checked={settings.maintenanceMode}
            onChange={handleSwitchChange('maintenanceMode')}
          />
        }
        label="Maintenance Mode"
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
