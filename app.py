import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px

# Page Configuration
st.set_page_config(
    page_title="Pawcare Strategic Optimizer",
    page_icon="🐾",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS for Navy and Gold Theme
st.markdown("""
    <style>
    .main {
        background-color: #fcfbf4;
    }
    div[data-testid="stMetricValue"] {
        font-size: 2.5rem;
        color: #002D62;
    }
    div[data-testid="stMetricDelta"] {
        font-size: 1.2rem;
    }
    .stButton>button {
        background-color: #002D62;
        color: white;
        border-radius: 8px;
    }
    .reportview-container .main .block-container {
        padding-top: 2rem;
    }
    [data-testid="stMetric"] {
        background-color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        border-top: 5px solid #D4AF37;
    }
    </style>
    """, unsafe_allow_stdio=True)

# Header
st.markdown(f"<h1 style='color: #002D62; margin-bottom: 0;'>🐾 Pawcare Strategic Optimizer</h1>", unsafe_allow_stdio=True)
st.markdown("<p style='color: #64748b; margin-bottom: 2rem;'>Pricing & Revenue Intelligence Dashboard v2.4</p>", unsafe_allow_stdio=True)

# Toggle Logic
col_toggle1, col_toggle2 = st.columns([1, 4])
with col_toggle1:
    is_optimized = st.toggle("Cluster-Optimized Mode", value=True)

# Data Definition based on Report Specifications
if is_optimized:
    metrics = {
        "rvh": 2800,
        "dailyAppts": 8,
        "aov": 2400,
        "margin": 48,
        "monthlyRev": 422400,
        "monthlyProfit": 202752,
        "tax": "10% (Minimized)",
        "status": "High Efficiency",
        "clv": "₹45,000",
        "cac": "₹2,200",
        "rvh_delta": "133%",
        "time": [85, 10, 5]
    }
else:
    metrics = {
        "rvh": 888,
        "dailyAppts": 3.5,
        "aov": 1800,
        "margin": 12,
        "monthlyRev": 151200,
        "monthlyProfit": 18144,
        "tax": "42% (Critical)",
        "status": "Operational Loss Risk",
        "clv": "₹22,000",
        "cac": "₹4,800",
        "rvh_delta": "-42%",
        "time": [45, 45, 10]
    }

# KPI Row
kpi1, kpi2, kpi3, kpi4 = st.columns(4)
kpi1.metric("Revenue / Van-Hour", f"₹{metrics['rvh']}", metrics['rvh_delta'])
kpi2.metric("Daily Appointments", metrics['dailyAppts'], help="Target is 7-8 for profitability")
kpi3.metric("Net Profit Margin", f"{metrics['margin']}%", "Healthy" if is_optimized else "Critical")
kpi4.metric("Avg Order Value", f"₹{metrics['aov']}", "Med-Upsell Active" if is_optimized else "Basic Only")

st.write("---")

# Main Content Grid
col_chart, col_stats = st.columns([2, 1])

with col_chart:
    st.subheader("Monthly Revenue vs Profit Comparison")
    
    # Chart Data
    df_chart = pd.DataFrame({
        "Category": ["Revenue", "Profit"],
        "Fragmented": [151200, 18144],
        "Optimized": [422400, 202752]
    })
    
    fig = go.Figure()
    fig.add_trace(go.Bar(
        x=df_chart['Category'], 
        y=df_chart['Fragmented'], 
        name='Fragmented Model',
        marker_color='#94a3b8',
        bordercolor="white"
    ))
    fig.add_trace(go.Bar(
        x=df_chart['Category'], 
        y=df_chart['Optimized'], 
        name='Cluster Model',
        marker_color='#002D62'
    ))
    
    fig.update_layout(
        barmode='group', 
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor='rgba(0,0,0,0)',
        margin=dict(l=0, r=0, t=20, b=0),
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
    )
    st.plotly_chart(fig, use_container_width=True)

    # Neighborhood Visual
    st.subheader("Geospatial Cluster Analysis")
    if is_optimized:
        st.success("✅ High Density 'Pet Corridor' Detected: 8 appointments secured in HSR Layout Cluster.")
        st.info("Logistics Tax: 10% minimized via proximity-based routing.")
    else:
        st.error("⚠️ Logistics Tax: 42% Travel Overhead. Strategic intervention required to build density.")

with col_stats:
    st.subheader("Time Utilization")
    
    # Pie Chart
    labels = ['Service', 'Travel', 'Admin']
    fig_pie = px.pie(
        values=metrics['time'], 
        names=labels, 
        color_discrete_sequence=['#002D62', '#D4AF37', '#94a3b8'],
        hole=0.6
    )
    fig_pie.update_layout(margin=dict(l=20, r=20, t=20, b=20), showlegend=True)
    st.plotly_chart(fig_pie, use_container_width=True)
    
    # Strategic Validation Card
    st.markdown(f"""
    <div style="background-color: #002D62; padding: 25px; border-radius: 15px; color: white;">
        <h3 style="color: #D4AF37; margin-top: 0;">Strategic Validation</h3>
        <p style="font-size: 0.8rem; color: #cbd5e1; margin-bottom: 0;">EFFICIENCY STATUS</p>
        <p style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">{metrics['status']}</p>
        <p style="font-size: 0.8rem; color: #cbd5e1; margin-bottom: 0;">LOGISTICS TAX</p>
        <p style="font-size: 1.5rem; font-weight: bold; color: {'#34d399' if is_optimized else '#f87171'};">{metrics['tax']}</p>
        <hr style="opacity: 0.2;">
        <div style="display: flex; justify-content: space-between;">
            <span>CLV Projection:</span>
            <span style="color: #D4AF37; font-weight: bold;">{metrics['clv']}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 10px;">
            <span>Unit CAC:</span>
            <span style="color: #34d399; font-weight: bold;">{metrics['cac']}</span>
        </div>
    </div>
    """, unsafe_allow_html=True)

# Footer
st.write("")
st.info(f"**Data Validation:** Report generated for Bala Bharath Kumar Pavuluri (M036-24) | Entrepreneurial Marketing Group 7")