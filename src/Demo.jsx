import * as React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import GridData from './griddata'
import { IconButton, TextField, Box, Stack, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
        children: [
            {
                segment: 'vehicles',
                title: 'Vehicles',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'spares',
                title: 'Spares',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
];
const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ pathname }) {
    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            {/* <Typography>Dashboard content for {pathname}</Typography> */}
            <GridData />
        </Box>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function ToolbarActionsSearch() {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>

            {/* Search Section */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Tooltip for Search Icon */}
                <Tooltip title="Search" enterDelay={1000}>
                    <div>
                        <IconButton
                            type="button"
                            aria-label="search"
                            sx={{
                                display: { xs: 'inline', md: 'none' },
                            }}
                        >
                            <SearchIcon />
                        </IconButton>
                    </div>
                </Tooltip>

                {/* Search Input Field (Visible on MD+) */}
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <IconButton type="button" aria-label="search" size="small">
                                    <SearchIcon />
                                </IconButton>
                            ),
                            sx: { pr: 0.5 },
                        },
                    }}
                    sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
                />
            </Box>
            {/* Notification Section */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Notifications" enterDelay={1000}>
                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>
                </Tooltip>
                <p>Notification</p>
            </Box>
            {/* User Section */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="User Options" enterDelay={1000}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Tooltip>
                <p>User</p>
            </Box>

            {/* Theme Switcher */}
            <ThemeSwitcher />
        </Stack>
    );
}



function SidebarFooter({ mini }) {
    return (
        <Typography
            variant="caption"
            sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
            {mini ? '© MUI' : `© ${new Date().getFullYear()} Made with love by MUI`}
        </Typography>
    );
}

SidebarFooter.propTypes = {
    mini: PropTypes.bool.isRequired,
};

function CustomAppTitle() {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <CloudCircleIcon fontSize="large" color="primary" />
            <Typography variant="h6">SML</Typography>
            {/* <Chip size="small" label="BETA" color="info" />
      <Tooltip title="Connected to production">
        <CheckCircleIcon color="success" fontSize="small" />
      </Tooltip> */}
        </Stack>
    );
}

function DashboardLayoutSlots(props) {
    const { window } = props;

    const router = useDemoRouter('/dashboard');

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout
                slots={{
                    appTitle: CustomAppTitle,
                    toolbarActions: ToolbarActionsSearch,
                    sidebarFooter: SidebarFooter,
                }}
            >
                <DemoPageContent pathname={router.pathname} />
            </DashboardLayout>
        </AppProvider>
    );
}

DashboardLayoutSlots.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default DashboardLayoutSlots;
