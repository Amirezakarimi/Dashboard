import React, { useMemo } from 'react';
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

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  return (
    <div style={{
      background: 'rgba(255,255,255,0.95)',
      border: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      borderRadius: 12,
      padding: '10px 12px',
      direction: 'rtl',
      backdropFilter: 'blur(6px)'
    }}>
      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#667eea', display: 'inline-block' }} />
        <span style={{ fontWeight: 600, color: '#1f2937' }}>بازدید:</span>
        <span style={{ fontWeight: 700, color: '#111827' }}>{numberFormatter(item.value)}</span>
      </div>
    </div>
  );
};

const VisitsAreaChart = ({ data }) => {
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

        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: '#475569' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={numberFormatter}
          tick={{ fontSize: 12, fill: '#475569' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />

        {avg != null && (
          <ReferenceLine y={avg} stroke="#94a3b8" strokeDasharray="4 4" ifOverflow="extendDomain" />
        )}

        <Area
          type="monotone"
          dataKey="visits"
          stroke="#667eea"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorVisits)"
          dot={{ r: 3, stroke: '#667eea', strokeWidth: 1, fill: '#fff' }}
          activeDot={{ r: 6 }}
          isAnimationActive
          animationDuration={800}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default VisitsAreaChart;
