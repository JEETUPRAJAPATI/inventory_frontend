import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Grid,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ReportSummary from './components/ReportSummary';
import ReportTable from './components/ReportTable';
import ReportCharts from './components/ReportCharts';
import ReportFilters from './components/ReportFilters';
import OrderService from '../../../services/dcutBagMakingService';

export default function DcutBagMakingReportsPage({ type }) {
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchReportList = async () => {
            try {
                const response = await OrderService.getRecords(); // Call API
                setRecords(response.data); // Update state with API response
            } catch (error) {
                console.error('Error fetching report data:', error);
            }
        };

        fetchReportList(); // Fetch data when component mounts
    }, [type]); // Re-fetch when type changes

    const bagType = type === 'wcut' ? 'W-Cut' : 'D-Cut';
    const basePath = `/production/${type}/bagmaking/dashboard`;

    const handleBack = () => {
        navigate(type ? basePath : '/production/bagmaking/dashboard');
    };

    return (
        <Box sx={{ pb: 7 }}>
            <Box sx={{ mt: 2, px: 3 }}>
                <Grid container spacing={3}>


                    <Grid item xs={12}>
                        <ReportSummary records={records} />
                    </Grid>

                    <Grid item xs={12}>
                        <ReportCharts records={records} />
                    </Grid>

                    <Grid item xs={12}>
                        <ReportTable records={records} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
