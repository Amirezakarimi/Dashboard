import React, { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';

const numberFormatter = (value) => {
  if (value == null) return '';
  try { return Number(value).toLocaleString('fa-IR'); } catch { return String(value); }
};

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  return (
    <div style={{
      background: isDark ? 'rgba(17,24,39,0.92)' : 'rgba(255,255,255,0.95)',
      border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
      boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.45)' : '0 8px 24px rgba(0,0,0,0.08)',
      borderRadius: 12,
      padding: '10px 12px',
      direction: 'rtl',
      backdropFilter: 'blur(6px)'
    }}>
      <div style={{ fontSize: 12, color: isDark ? '#9ca3af' : '#64748b', marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#667eea', display: 'inline-block' }} />
        <span style={{ fontWeight: 600, color: isDark ? '#e5e7eb' : '#1f2937' }}>بازدید:</span>
        <span style={{ fontWeight: 700, color: isDark ? '#f3f4f6' : '#111827' }}>{numberFormatter(item.value)}</span>
      </div>
    </div>
  );
};

const VisitsAreaChart = ({ data }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const avg = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return null;
    const sum = data.reduce((acc, d) => acc + (Number(d.visits) || 0), 0);
    return Math.round(sum / data.length);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#667eea" stopOpacity={0.85} />
            <stop offset="55%" stopColor="#7c3aed" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e5e7eb'} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#475569' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={numberFormatter}
          tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#475569' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip isDark={isDark} />} />

        {avg != null && (
          <ReferenceLine y={avg} stroke={isDark ? '#374151' : '#94a3b8'} strokeDasharray="4 4" ifOverflow="extendDomain" />
        )}

        <Area
          type="monotone"
          dataKey="visits"
          stroke="#667eea"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorVisits)"
          dot={{ r: 3, stroke: '#667eea', strokeWidth: 1, fill: isDark ? '#111827' : '#fff' }}
          activeDot={{ r: 6 }}
          isAnimationActive
          animationDuration={800}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default VisitsAreaChart;
