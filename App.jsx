import { useState, useEffect, useCallback } from "react";

const REPS = ["J.Bell","Jose","J.Livelli","Heather","OmerP","Todd","Josh","Shannon","Eric","Halil","House"];
const YEARS = ["2025","2026","2027"];
const YEAR_MONTHS = [
  {key:"Jan",label:"January"},{key:"Feb",label:"February"},{key:"Mar",label:"March"},
  {key:"Apr",label:"April"},{key:"May",label:"May"},{key:"Jun",label:"June"},
  {key:"Jul",label:"July"},{key:"Aug",label:"August"},{key:"Sep",label:"September"},
  {key:"Oct",label:"October"},{key:"Nov",label:"November"},{key:"Dec",label:"December"},
];
const MANAGER_PIN = "mgr2025";
const STORAGE_KEY = "dist_forecast_v5";

const DISTRIBUTORS = [
  {
    name:"DOT", label:"DOT Foods",
    customers:["AWG","Albertsons","Amcon","CVS","Capitol Distributing","Cooper Booth","Core-Mark",
      "Crossroads","Dot Foods","Fareway","GSC","Harbor Foods","Harris Teeter","Henry's Foods",
      "Hy-Vee","Kroger","Midwest Food & Tobacco","SAS","Stewart","Vicksburg Specialty","Vistar",
      "Winn Dixie"],
    products:[
      {sku:"NG-7656",desc:"Key Lime Pretzels 12/7 oz"},
      {sku:"CVS-372992",desc:"WM Organic Dark Chocolate Cherry Trail Mix 12/6 oz"},
      {sku:"CVS-351142",desc:"Heart Healthy Snack Mix 12/5 oz"},
      {sku:"CVS-385681",desc:"WM Keto Snack Mix 12/5 oz"},
      {sku:"CVS-304784",desc:"WM Keto Dark Chocolate Coconut Trail Mix 12/6 oz"},
      {sku:"CVS-481296",desc:"WM Greek Yogurt Coated Almonds 12/6.5 oz"},
      {sku:"CVS-516714",desc:"WM Keto Dark Chocolate Coconut Trail Mix 24/3 oz"},
      {sku:"CVS-228046",desc:"WM Fruit and Nut Trail Mix 12/8 oz"},
      {sku:"NG-8535",desc:"Probiotic Yoggie Bites Strawberry 12x 7/0.7 oz"},
      {sku:"NG-8536",desc:"Probiotic Mixed Berry Yoggies 12x 7/0.7 oz"},
      {sku:"NG-8656",desc:"Probiotic Yoggie Bites Strawberry 12/2 oz"},
      {sku:"NG-8657",desc:"Probiotic Yoggie Bites Mixed Berry 12/2 oz"},
      {sku:"NG-8653",desc:"Probiotic Lemon Berry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8671",desc:"NG Probiotic Strawberry Yoggies 12x 7/0.7 oz"},
      {sku:"NG-8672",desc:"NG Probiotic Mixed Berry Yoggies 12x 7/0.7 oz"},
      {sku:"NG-8325",desc:"Probiotic Strawberry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8326",desc:"Probiotic Mixed Berry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8346",desc:"Probiotic Mango Peach Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8361",desc:"Probiotic Tropical Yoggies 6x 12/.7oz"},
      {sku:"NG-8347",desc:"Probiotic Lemonberry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8342",desc:"Probiotic Strawberry Yoggie Trail Mix 6x 10/1 oz"},
      {sku:"NG-8343",desc:"Probiotic Mixed Berry Yoggies Trail Mix 6x 10/1 oz"},
      {sku:"NG-8340",desc:"Probiotic Strawberry Yoggies Trail Mix 12/8 oz"},
      {sku:"NG-8341",desc:"Probiotic Mixed Berry Yoggies Trail Mix 12/8 oz"},
      {sku:"NG-8103",desc:"Yoggies Strawberry 1.8oz"},
      {sku:"NG-8104",desc:"Yoggies Mixed Berry 1.8oz"},
      {sku:"NG-8115",desc:"Yoggies Strawberry Trail Mix 1.8oz"},
      {sku:"NG-8116",desc:"Yoggies Mixed Berry Trail Mix 1.8oz"},
      {sku:"NG-8133",desc:"Yoggies Strawberry 2oz"},
      {sku:"NG-8134",desc:"Yoggies Mixed Berry 2oz"},
      {sku:"NG-8166",desc:"Yoggies Strawberry .7oz 100ct"},
      {sku:"NG-8167",desc:"Yoggies Mixed Berry .7oz 100ct"},
      {sku:"NG-8169",desc:"Yoggies Dump Bins"},
      {sku:"NG-8269",desc:"NG Probiotic Strawberry Yoggies 6x 5/0.7 oz"},
      {sku:"NG-8270",desc:"NG Probiotic Mixed Berry Yoggies 6x 5/0.7 oz"},
      {sku:"NG-8293",desc:"Probiotic Mango Peach Yoggies 12x (DRC)"},
      {sku:"NG-8310",desc:"Probiotic Mango Peach Yoggies 12x 7/0.7 oz"},
      {sku:"NG-8239",desc:"Raspberry Fruichia 6x 8/0.7 oz"},
      {sku:"NG-8240",desc:"Strawberry Fruichia 6x 8/0.7 oz"},
      {sku:"NG-8378",desc:"Yoggie Shipper 12 carton box 50x 12/0.7 oz"},
      {sku:"NG-8429",desc:"Probiotic Yoggies Halloween Variety MP 6x 12/0.7 oz"},
      {sku:"NG-8489",desc:"Probiotic Yoggies Christmas Variety Snack Pack 6x 12/0.7 oz"},
      {sku:"NG-8494",desc:"Probiotic Yoggies Christmas Variety Shipper 35x 12/0.7 oz"},
      {sku:"NG-8533",desc:"Probiotic Yoggies New Shipper New"},
      {sku:"NG-8534",desc:"Yoggies Trail Mix Shipper 500"},
    ]
  },
  {
    name:"KEHE", label:"KEHE",
    customers:["Save Mart","Sprouts","Stater Bros"],
    products:[
      {sku:"NG-8325",desc:"Probiotic Strawberry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8326",desc:"Probiotic Mixed Berry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8342",desc:"Probiotic Strawberry Yoggie Trail Mix 6x 10/1 oz"},
      {sku:"NG-8343",desc:"Probiotic Mixed Berry Yoggies Trail Mix 6x 10/1 oz"},
      {sku:"NG-8249",desc:"Probiotic Strawberry Yoggies 1.8oz"},
      {sku:"NG-8250",desc:"Probiotic Mixed Berry Yoggies 1.8oz"},
      {sku:"NG-8361",desc:"Probiotic Tropical Yoggies 6x 12/.7oz"},
    ]
  },
  {
    name:"TOPS", label:"C&S / TOPS",
    customers:["Tops","Winn Dixie","Price Chopper"],
    products:[
      {sku:"NG-7025",desc:"Multi Pack - Omega-3 Deluxe Mix 6x 7/1.2 oz"},
      {sku:"GEN-DRF2005",desc:"Banana Chips 12/5 oz"},
      {sku:"GEN-DRF2012",desc:"Pitted Dates 12/10 oz"},
      {sku:"GEN-DRF2015",desc:"Ginger Crystallized 12/8 oz"},
      {sku:"GEN-DRF2018",desc:"Mango Slices 12/7.5 oz"},
      {sku:"GEN-DRF2020",desc:"Papaya Chunks 12/9 oz"},
      {sku:"GEN-DRF2023",desc:"Pineapple Chunks 12/9 oz"},
      {sku:"GEN-DRF2025",desc:"Pitted Prunes 12/12 oz"},
      {sku:"GEN-DRF2036",desc:"Kiwi 12/9 oz"},
      {sku:"GEN-DRF2052",desc:"Cranberries 12/10 oz"},
      {sku:"GEN-GRN2427",desc:"Green Split Peas 12/11 oz"},
      {sku:"GEN-LTUB5046",desc:"Plantain Chips 12/10 oz"},
      {sku:"GEN-MIX2237",desc:"Green Peas Wasabi 12/6.5 oz"},
      {sku:"NG-8535",desc:"Probiotic Yoggie Bites Strawberry 12x 7/0.7 oz"},
      {sku:"NG-8536",desc:"Probiotic Mixed Berry Yoggies 12x 7/0.7 oz"},
      {sku:"NG-8653",desc:"Probiotic Lemon Berry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8325",desc:"Probiotic Strawberry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8326",desc:"Probiotic Mixed Berry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8340",desc:"Probiotic Strawberry Yoggies Trail Mix 12/8 oz"},
      {sku:"NG-8341",desc:"Probiotic Mixed Berry Yoggies Trail Mix 12/8 oz"},
      {sku:"NG-8310",desc:"Probiotic Mango Peach Yoggies 12x 7/0.7 oz"},
      {sku:"NG-8166",desc:"Probiotic Yoggie Bites Strawberry 100/0.7 oz"},
      {sku:"NG-8167",desc:"Probiotic Yoggie Mixed Berry 100/0.7 oz"},
    ]
  },
];

// ── Storage ──────────────────────────────────────────────────────────────────
async function loadAll(){
  try{
    const [fRes,cRes]=await Promise.all([
      window.storage.get(STORAGE_KEY),
      window.storage.get(STORAGE_KEY+"_customers"),
    ]);
    return {
      forecasts: fRes ? JSON.parse(fRes.value) : {},
      extraCustomers: cRes ? JSON.parse(cRes.value) : {},
    };
  }catch{return {forecasts:{},extraCustomers:{}};}
}
async function saveForecasts(d){try{await window.storage.set(STORAGE_KEY,JSON.stringify(d));}catch(e){console.error(e);}}
async function saveExtraCustomers(d){try{await window.storage.set(STORAGE_KEY+"_customers",JSON.stringify(d));}catch(e){console.error(e);}}

// ── Helpers ───────────────────────────────────────────────────────────────────
function weeksInMonth(monthKey,year){
  const d=new Date(`${monthKey} 1 ${year}`);
  return parseFloat((new Date(d.getFullYear(),d.getMonth()+1,0).getDate()/7).toFixed(2));
}
function calcForecast(cell){
  if(!cell) return null;
  const vel=parseFloat(cell.velocity)||0;
  const stores=parseInt(cell.stores)||0;
  const weeks=parseFloat(cell.weeks)||0;
  const base=Math.round(vel*stores*weeks);
  const manual=parseInt(cell.manualQty)||0;
  const useManual=cell.useManual&&manual>0;
  const baseQty=useManual?manual:base;
  const liftPct=parseFloat(cell.liftPct)||0;
  const liftFlat=parseInt(cell.liftFlat)||0;
  const liftUnits=Math.round(baseQty*(liftPct/100));
  const total=baseQty+liftUnits+liftFlat;
  return {base:baseQty,liftUnits,liftFlat,total,liftPct,stores,vel,weeks,useManual,manual};
}
function getInheritedStores(forecasts,dist,sku,customer,year,monthKey){
  const idx=YEAR_MONTHS.findIndex(m=>m.key===monthKey);
  for(let i=idx-1;i>=0;i--){
    const k=`${dist}||${customer}||${sku}||${year}||${YEAR_MONTHS[i].key}`;
    if(forecasts[k]?.stores) return {stores:forecasts[k].stores,fromMonth:YEAR_MONTHS[i].key};
  }
  return null;
}
function exportCSV(forecasts,year,distName){
  const months=YEAR_MONTHS.map(m=>m.key);
  const distList=distName?DISTRIBUTORS.filter(d=>d.name===distName):DISTRIBUTORS;
  const rows=[["Distributor","Customer","SKU","Description","Rep",
    ...months.flatMap(m=>[`${m} Total`,`${m} Base`,`${m} Vel/Store/Wk`,`${m} Stores`,`${m} Weeks`,`${m} Promo%`,`${m} PromoFlat`,`${m} Confidence`,`${m} Notes`])]];
  distList.forEach(dist=>{
    const allCustomers=new Set();
    Object.keys(forecasts).forEach(k=>{if(k.startsWith(dist.name+"||")){const[,c]=k.split("||");allCustomers.add(c);}});
    allCustomers.forEach(customer=>{
      dist.products.forEach(prod=>{
        const hasData=months.some(m=>forecasts[`${dist.name}||${customer}||${prod.sku}||${year}||${m}`]?.stores||forecasts[`${dist.name}||${customer}||${prod.sku}||${year}||${m}`]?.manualQty);
        if(!hasData) return;
        const row=[dist.label,customer,prod.sku,prod.desc,""];
        months.forEach(m=>{
          const cell=forecasts[`${dist.name}||${customer}||${prod.sku}||${year}||${m}`];
          const fc=calcForecast(cell);
          row.push(fc?fc.total:"",fc?fc.base:"",cell?.velocity||"",cell?.stores||"",cell?.weeks||"",cell?.liftPct||"",cell?.liftFlat||"",cell?.conf||"",(cell?.notes||"").replace(/,/g,""));
        });
        rows.push(row);
      });
    });
  });
  const csv=rows.map(r=>r.join(",")).join("\n");
  const blob=new Blob([csv],{type:"text/csv"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download=`forecast_${distName||"all"}_${year}.csv`;a.click();URL.revokeObjectURL(url);
}

const CONF_OPTS=["","Low","Medium","High"];
const CS={Low:{bg:"#FEF2F2",c:"#991B1B"},Medium:{bg:"#FFFBEB",c:"#92400E"},High:{bg:"#F0FDF4",c:"#166534"}};
const TH={padding:"7px 10px",fontWeight:600,color:"#374151",borderBottom:"2px solid #D1D5DB",whiteSpace:"nowrap",fontSize:12};
const TD={padding:"5px 8px",color:"#374151",borderBottom:"1px solid #F3F4F6",fontSize:12,verticalAlign:"top"};

// ── Planning Panel ────────────────────────────────────────────────────────────
function PlanningPanel({dist,customer,sku,monthKey,year,forecasts,onSave,onClose,repName}){
  const cellKey=`${dist}||${customer}||${sku}||${year}||${monthKey}`;
  const ex=forecasts[cellKey]||{};
  const wks=weeksInMonth(monthKey,year);
  const inherited=getInheritedStores(forecasts,dist,sku,customer,year,monthKey);
  const [d,setD]=useState({
    velocity:ex.velocity||"", stores:ex.stores||(inherited?.stores||""),
    weeks:ex.weeks||wks.toFixed(1), liftPct:ex.liftPct||"", liftFlat:ex.liftFlat||"",
    isReset:ex.isReset||false, conf:ex.conf||"", notes:ex.notes||"",
    useManual:ex.useManual||false, manualQty:ex.manualQty||"",
  });
  const [saving,setSaving]=useState(false);
  const fc=calcForecast({...d});
  const storesInherited=!ex.stores&&inherited&&!d.isReset;
  const month=YEAR_MONTHS.find(m=>m.key===monthKey);

  async function handleSave(){
    setSaving(true);
    await onSave(cellKey,{...d,rep:repName,updatedAt:new Date().toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})});
    setSaving(false);onClose();
  }

  return(
    <div style={{position:"absolute",zIndex:200,top:"100%",left:0,background:"#fff",
      border:"1.5px solid #3B82F6",borderRadius:10,padding:14,width:310,
      boxShadow:"0 8px 30px rgba(0,0,0,0.15)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div>
          <div style={{fontSize:13,fontWeight:600,color:"#1D4ED8"}}>{month?.label} {year}</div>
          <div style={{fontSize:11,color:"#9CA3AF"}}>{customer} · {sku}</div>
        </div>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:"#9CA3AF",lineHeight:1,padding:"0 4px"}}>×</button>
      </div>

      <label style={{display:"flex",alignItems:"center",gap:6,marginBottom:10,cursor:"pointer",background:"#F9FAFB",borderRadius:6,padding:"6px 8px"}}>
        <input type="checkbox" checked={d.useManual} onChange={e=>setD(p=>({...p,useManual:e.target.checked}))}
          style={{accentColor:"#6366F1",width:14,height:14}}/>
        <span style={{fontSize:12,color:"#374151",fontWeight:500}}>Enter units directly (no velocity calc)</span>
      </label>

      {d.useManual ? (
        <div style={{background:"#EEF2FF",border:"1px solid #C7D2FE",borderRadius:7,padding:"10px 12px",marginBottom:10}}>
          <div style={{fontSize:11,color:"#4338CA",fontWeight:600,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.05em"}}>Manual quantity</div>
          <input type="number" value={d.manualQty} placeholder="Enter total units"
            onChange={e=>setD(p=>({...p,manualQty:e.target.value}))}
            style={{width:"100%",border:"1px solid #C7D2FE",borderRadius:5,padding:"7px 10px",fontSize:14,fontWeight:600,boxSizing:"border-box"}}/>
        </div>
      ) : (
        <div style={{background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:7,padding:"10px 12px",marginBottom:10}}>
          <div style={{fontSize:11,color:"#0369A1",fontWeight:600,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>Base velocity</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>
              <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Units/store/wk</label>
              <input type="number" value={d.velocity} placeholder="e.g. 2.5"
                onChange={e=>setD(p=>({...p,velocity:e.target.value}))}
                style={{border:"1px solid #BAE6FD",borderRadius:5,padding:"5px 7px",fontSize:13,width:"100%",boxSizing:"border-box"}}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>
              <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>
                Stores {storesInherited&&<span style={{color:"#F59E0B",fontSize:10}}>↳{inherited.fromMonth}</span>}
              </label>
              <input type="number" value={d.stores} placeholder={inherited?.stores||""}
                onChange={e=>setD(p=>({...p,stores:e.target.value}))}
                style={{border:`1px solid ${storesInherited?"#FCD34D":"#BAE6FD"}`,borderRadius:5,padding:"5px 7px",fontSize:13,background:storesInherited?"#FFFBEB":"#fff"}}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>
              <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Weeks</label>
              <input type="number" value={d.weeks} placeholder="4.3"
                onChange={e=>setD(p=>({...p,weeks:e.target.value}))}
                style={{border:"1px solid #BAE6FD",borderRadius:5,padding:"5px 7px",fontSize:13}}/>
            </div>
          </div>
          {(d.velocity||d.stores||d.weeks)&&(
            <div style={{marginTop:8,fontSize:11,background:"#E0F2FE",borderRadius:5,padding:"5px 8px",fontFamily:"monospace",color:"#374151"}}>
              {d.velocity||"?"} × {d.stores||(inherited?.stores||"?")} × {d.weeks||"?"} = <strong>{fc?fc.base.toLocaleString():"—"} units</strong>
            </div>
          )}
          <label style={{display:"flex",alignItems:"center",gap:6,marginTop:8,cursor:"pointer"}}>
            <input type="checkbox" checked={d.isReset} onChange={e=>setD(p=>({...p,isReset:e.target.checked}))}
              style={{accentColor:"#F59E0B",width:14,height:14}}/>
            <span style={{fontSize:11,color:"#92400E",fontWeight:500}}>Reset month — new store count takes effect here</span>
          </label>
          {d.isReset&&d.stores&&(
            <div style={{marginTop:5,fontSize:11,background:"#FFFBEB",border:"1px solid #FCD34D",borderRadius:5,padding:"5px 8px",color:"#92400E"}}>
              {d.stores} stores carries forward until next reset
            </div>
          )}
        </div>
      )}

      <div style={{background:"#FDF4FF",border:"1px solid #E9D5FF",borderRadius:7,padding:"10px 12px",marginBottom:10}}>
        <div style={{fontSize:11,color:"#7C3AED",fontWeight:600,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.05em"}}>Promotional lift</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div style={{display:"flex",flexDirection:"column",gap:3}}>
            <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Lift %</label>
            <input type="number" value={d.liftPct} placeholder="e.g. 30"
              onChange={e=>setD(p=>({...p,liftPct:e.target.value}))}
              style={{border:"1px solid #E9D5FF",borderRadius:5,padding:"5px 7px",fontSize:13}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:3}}>
            <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Flat units</label>
            <input type="number" value={d.liftFlat} placeholder="e.g. 500"
              onChange={e=>setD(p=>({...p,liftFlat:e.target.value}))}
              style={{border:"1px solid #E9D5FF",borderRadius:5,padding:"5px 7px",fontSize:13}}/>
          </div>
        </div>
        {fc&&(fc.liftUnits>0||fc.liftFlat>0)&&(
          <div style={{marginTop:6,fontSize:11,background:"#F3E8FF",borderRadius:5,padding:"5px 8px",fontFamily:"monospace",color:"#374151"}}>
            {fc.base.toLocaleString()} {fc.liftUnits>0&&<>+ {fc.liftPct}% ({fc.liftUnits.toLocaleString()})</>} {fc.liftFlat>0&&<>+ {fc.liftFlat.toLocaleString()}</>} = <strong>{fc.total.toLocaleString()}</strong>
          </div>
        )}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
        <div style={{display:"flex",flexDirection:"column",gap:3}}>
          <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Confidence</label>
          <select value={d.conf} onChange={e=>setD(p=>({...p,conf:e.target.value}))}
            style={{border:"1px solid #D1D5DB",borderRadius:5,padding:"5px 8px",fontSize:13,
              background:d.conf&&CS[d.conf]?CS[d.conf].bg:"#fff",
              color:d.conf&&CS[d.conf]?CS[d.conf].c:"#374151"}}>
            {CONF_OPTS.map(o=><option key={o} value={o}>{o||"Select…"}</option>)}
          </select>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:3}}>
          <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Notes</label>
          <input type="text" value={d.notes} placeholder="Optional"
            onChange={e=>setD(p=>({...p,notes:e.target.value}))}
            style={{border:"1px solid #D1D5DB",borderRadius:5,padding:"5px 8px",fontSize:13}}/>
        </div>
      </div>

      <div style={{borderTop:"1px solid #F3F4F6",paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <span style={{fontSize:12,color:"#6B7280"}}>Total: </span>
          <strong style={{fontSize:18,color:fc?.total>0?"#166534":"#9CA3AF"}}>{fc?fc.total.toLocaleString():"—"}</strong>
          <span style={{fontSize:11,color:"#9CA3AF"}}> units</span>
        </div>
        <button onClick={handleSave} disabled={saving}
          style={{background:"#166534",color:"#fff",border:"none",borderRadius:6,padding:"7px 20px",fontSize:13,fontWeight:500,cursor:"pointer",opacity:saving?0.7:1}}>
          {saving?"Saving…":"Save"}
        </button>
      </div>
    </div>
  );
}

function CellDisplay({cell,inherited}){
  const fc=calcForecast(cell);
  const storesInherited=!cell?.stores&&inherited;
  if(!fc||fc.total===0) return <span style={{color:"#D1D5DB",fontSize:11}}>—</span>;
  const hasPromo=fc.liftUnits>0||fc.liftFlat>0;
  return(
    <div>
      <div style={{fontWeight:700,fontSize:13}}>{fc.total.toLocaleString()}</div>
      <div style={{fontSize:10,color:"#9CA3AF",marginTop:1}}>
        {fc.useManual?<span style={{color:"#6366F1"}}>manual</span>:<>{fc.base.toLocaleString()} base</>}
        {hasPromo&&<span style={{color:"#7C3AED"}}> +{(fc.liftUnits+fc.liftFlat).toLocaleString()} promo</span>}
      </div>
      {!fc.useManual&&(cell?.stores||storesInherited)&&(
        <div style={{fontSize:10,color:storesInherited?"#D97706":"#9CA3AF",marginTop:1}}>
          {storesInherited?"↳":""}{cell?.stores||inherited?.stores} stores
          {cell?.isReset&&<span style={{marginLeft:3,background:"#FEF3C7",color:"#92400E",borderRadius:3,padding:"0 3px",fontSize:9}}>RESET</span>}
        </div>
      )}
      {cell?.conf&&<div style={{fontSize:9,marginTop:2,display:"inline-block",background:CS[cell.conf]?.bg,color:CS[cell.conf]?.c,borderRadius:3,padding:"1px 4px"}}>{cell.conf}</div>}
    </div>
  );
}

// ── Rep Grid ─────────────────────────────────────────────────────────────────
function RepGrid({repName,forecasts,setForecasts,extraCustomers,setExtraCustomers,year,setYear,activeDist,setActiveDist}){
  const [activeCustomer,setActiveCustomer]=useState(null);
  const [editCell,setEditCell]=useState(null);
  const [newCustomer,setNewCustomer]=useState("");
  const [addingCustomer,setAddingCustomer]=useState(false);

  const dist=DISTRIBUTORS.find(d=>d.name===activeDist)||DISTRIBUTORS[0];
  const extraCusts=(extraCustomers[dist.name]||[]);
  const allCustomers=[...dist.customers,...extraCusts];
  const customer=activeCustomer||allCustomers[0];
  const visMonths=YEAR_MONTHS;

  const key=(c,sku,m)=>`${dist.name}||${c}||${sku}||${year}||${m}`;

  async function handleSave(cellKey,cellData){
    const updated={...forecasts,[cellKey]:cellData};
    setForecasts(updated);
    await saveForecasts(updated);
  }

  async function addCustomer(){
    const name=newCustomer.trim();
    if(!name) return;
    const updated={...extraCustomers,[dist.name]:[...(extraCustomers[dist.name]||[]),name]};
    setExtraCustomers(updated);
    await saveExtraCustomers(updated);
    setActiveCustomer(name);
    setNewCustomer("");setAddingCustomer(false);
  }

  const monthTotal=(m)=>{
    let t=0;
    dist.products.forEach(p=>{const fc=calcForecast(forecasts[key(customer,p.sku,m)]);if(fc)t+=fc.total;});
    return t;
  };

  return(
    <div style={{padding:"14px 0"}}>
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
        <span style={{fontSize:12,color:"#6B7280",fontWeight:500}}>Distributor:</span>
        {DISTRIBUTORS.map(d=>(
          <button key={d.name} onClick={()=>{setActiveDist(d.name);setActiveCustomer(null);}}
            style={{background:activeDist===d.name?"#1E40AF":"#F3F4F6",color:activeDist===d.name?"#fff":"#374151",
              border:"none",borderRadius:6,padding:"5px 14px",fontSize:13,fontWeight:activeDist===d.name?600:400,cursor:"pointer"}}>
            {d.name}
          </button>
        ))}
        <select value={year} onChange={e=>setYear(e.target.value)}
          style={{marginLeft:"auto",border:"1px solid #D1D5DB",borderRadius:6,padding:"5px 8px",fontSize:13,background:"#fff"}}>
          {YEARS.map(y=><option key={y}>{y}</option>)}
        </select>
      </div>

      <div style={{background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:8,padding:"10px 14px",marginBottom:12}}>
        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{fontSize:12,color:"#1E40AF",fontWeight:600,marginRight:4}}>Customer:</span>
          {allCustomers.map(c=>(
            <button key={c} onClick={()=>setActiveCustomer(c)}
              style={{background:customer===c?"#1E40AF":"#fff",color:customer===c?"#fff":"#374151",
                border:`1px solid ${customer===c?"#1E40AF":"#BFDBFE"}`,borderRadius:6,padding:"4px 12px",fontSize:12,
                fontWeight:customer===c?600:400,cursor:"pointer"}}>
              {c}
              {extraCusts.includes(c)&&<span style={{marginLeft:4,fontSize:9,color:customer===c?"#BAE6FD":"#9CA3AF"}}>new</span>}
            </button>
          ))}
          {addingCustomer?(
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <input autoFocus type="text" value={newCustomer} placeholder="Customer name"
                onChange={e=>setNewCustomer(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter")addCustomer();if(e.key==="Escape")setAddingCustomer(false);}}
                style={{border:"1px solid #BFDBFE",borderRadius:6,padding:"4px 10px",fontSize:12,width:160}}/>
              <button onClick={addCustomer}
                style={{background:"#166534",color:"#fff",border:"none",borderRadius:6,padding:"4px 12px",fontSize:12,cursor:"pointer"}}>Add</button>
              <button onClick={()=>setAddingCustomer(false)}
                style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:"#9CA3AF"}}>×</button>
            </div>
          ):(
            <button onClick={()=>setAddingCustomer(true)}
              style={{background:"none",border:"1px dashed #93C5FD",borderRadius:6,padding:"4px 10px",fontSize:12,color:"#3B82F6",cursor:"pointer"}}>
              + Add customer
            </button>
          )}
        </div>
      </div>

      <div style={{overflowX:"auto"}}>
        <table style={{borderCollapse:"collapse",fontSize:12,width:"100%",minWidth:1100}}>
          <thead>
            <tr style={{background:"#F3F4F6"}}>
              <th style={{...TH,width:100,textAlign:"left",position:"sticky",left:0,background:"#F3F4F6",zIndex:10}}>Product #</th>
              <th style={{...TH,minWidth:200,textAlign:"left",position:"sticky",left:100,background:"#F3F4F6",zIndex:10}}>Description</th>
              {visMonths.map(m=>(
                <th key={m.key} style={{...TH,minWidth:110,textAlign:"center",borderLeft:"2px solid #D1D5DB"}}>
                  <div style={{fontWeight:600}}>{m.label}</div>
                  <div style={{fontWeight:600,color:"#166534",fontSize:11}}>{monthTotal(m.key).toLocaleString()}</div>
                  <div style={{fontWeight:400,color:"#9CA3AF",fontSize:10}}>{weeksInMonth(m.key,year).toFixed(1)} wks</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dist.products.map(prod=>{
              const skuColor=prod.sku.startsWith("NG-")?"#B91C1C":prod.sku.startsWith("CVS-")?"#1D4ED8":prod.sku.startsWith("GEN-")?"#065F46":"#374151";
              return(
                <tr key={prod.sku} style={{borderBottom:"1px solid #F3F4F6"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#F9FAFB"}
                  onMouseLeave={e=>e.currentTarget.style.background=""}>
                  <td style={{...TD,color:skuColor,fontWeight:600,position:"sticky",left:0,background:"inherit",zIndex:5}}>{prod.sku}</td>
                  <td style={{...TD,maxWidth:220,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",position:"sticky",left:100,background:"inherit",zIndex:5}} title={prod.desc}>{prod.desc}</td>
                  {visMonths.map(m=>{
                    const k=key(customer,prod.sku,m.key);
                    const cell=forecasts[k];
                    const isOpen=editCell===k;
                    const inherited=getInheritedStores(forecasts,dist.name,prod.sku,customer,year,m.key);
                    const fc=calcForecast(cell);
                    const hasPromo=fc&&(fc.liftUnits>0||fc.liftFlat>0);
                    const bg=isOpen?"#EFF6FF":fc?.total>0?(hasPromo?"#FAF5FF":"#F0FDF4"):"#fff";
                    return(
                      <td key={m.key} onClick={()=>setEditCell(isOpen?null:k)}
                        style={{...TD,borderLeft:"2px solid #E5E7EB",cursor:"pointer",background:bg,padding:"5px 8px",position:"relative",minWidth:110}}>
                        <CellDisplay cell={cell} inherited={inherited}/>
                        {isOpen&&(
                          <PlanningPanel dist={dist.name} customer={customer} sku={prod.sku} monthKey={m.key}
                            year={year} forecasts={forecasts} onSave={handleSave}
                            onClose={()=>setEditCell(null)} repName={repName}/>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Manager View ──────────────────────────────────────────────────────────────
function ManagerView({forecasts,extraCustomers,year,setYear,onRefresh}){
  const [activeDist,setActiveDist]=useState(DISTRIBUTORS[0].name);
  const [filterCustomer,setFilterCustomer]=useState("All");
  const [filterRep,setFilterRep]=useState("All");
  const dist=DISTRIBUTORS.find(d=>d.name===activeDist);
  const extraCusts=extraCustomers[activeDist]||[];
  const allCustomers=["All",...dist.customers,...extraCusts];
  const visMonths=YEAR_MONTHS;

  const key=(c,sku,m)=>`${dist.name}||${c}||${sku}||${year}||${m}`;

  const getCustomersWithData=()=>{
    const set=new Set();
    Object.keys(forecasts).forEach(k=>{
      const parts=k.split("||");
      if(parts[0]===dist.name&&parts[3]===year){
        const fc=calcForecast(forecasts[k]);
        if(fc?.total>0){
          if(filterRep==="All"||forecasts[k]?.rep===filterRep) set.add(parts[1]);
        }
      }
    });
    return [...set].sort();
  };

  const customersToShow=filterCustomer==="All"?getCustomersWithData():[filterCustomer];

  const monthGrandTotal=(m)=>{
    let t=0;
    customersToShow.forEach(c=>{
      dist.products.forEach(p=>{
        const v=forecasts[key(c,p.sku,m)];
        if(filterRep==="All"||v?.rep===filterRep){
          const fc=calcForecast(v);if(fc)t+=fc.total;
        }
      });
    });
    return t;
  };

  return(
    <div style={{padding:"14px 0"}}>
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
        {DISTRIBUTORS.map(d=>(
          <button key={d.name} onClick={()=>{setActiveDist(d.name);setFilterCustomer("All");}}
            style={{background:activeDist===d.name?"#1E40AF":"#F3F4F6",color:activeDist===d.name?"#fff":"#374151",
              border:"none",borderRadius:6,padding:"5px 14px",fontSize:13,fontWeight:activeDist===d.name?600:400,cursor:"pointer"}}>
            {d.name}
          </button>
        ))}
        <select value={year} onChange={e=>setYear(e.target.value)}
          style={{border:"1px solid #D1D5DB",borderRadius:6,padding:"5px 8px",fontSize:13,background:"#fff"}}>
          {YEARS.map(y=><option key={y}>{y}</option>)}
        </select>
        <select value={filterCustomer} onChange={e=>setFilterCustomer(e.target.value)}
          style={{border:"1px solid #D1D5DB",borderRadius:6,padding:"5px 8px",fontSize:13,background:"#fff",minWidth:140}}>
          {allCustomers.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterRep} onChange={e=>setFilterRep(e.target.value)}
          style={{border:"1px solid #D1D5DB",borderRadius:6,padding:"5px 8px",fontSize:13,background:"#fff"}}>
          <option value="All">All Reps</option>
          {REPS.map(r=><option key={r} value={r}>{r}</option>)}
        </select>
        <button onClick={onRefresh} style={{background:"none",border:"1px solid #D1D5DB",borderRadius:6,padding:"5px 12px",fontSize:12,cursor:"pointer"}}>↻</button>
        <button onClick={()=>exportCSV(forecasts,year,activeDist)}
          style={{background:"#166534",color:"#fff",border:"none",borderRadius:6,padding:"5px 14px",fontSize:12,fontWeight:500,cursor:"pointer"}}>
          ↓ Export CSV
        </button>
      </div>

      {customersToShow.length===0?(
        <div style={{textAlign:"center",padding:"60px 0",color:"#9CA3AF",fontSize:14}}>No forecast data entered yet for {dist.label}.</div>
      ):(
        <div style={{overflowX:"auto"}}>
          <table style={{borderCollapse:"collapse",fontSize:12,width:"100%",minWidth:1100}}>
            <thead>
              <tr style={{background:"#F3F4F6"}}>
                <th style={{...TH,width:120,textAlign:"left",position:"sticky",left:0,background:"#F3F4F6",zIndex:10}}>Customer</th>
                <th style={{...TH,width:100,textAlign:"left",position:"sticky",left:120,background:"#F3F4F6",zIndex:10}}>Product #</th>
                <th style={{...TH,minWidth:180,textAlign:"left",position:"sticky",left:220,background:"#F3F4F6",zIndex:10}}>Description</th>
                {visMonths.map(m=>(
                  <th key={m.key} style={{...TH,minWidth:110,textAlign:"center",borderLeft:"2px solid #D1D5DB"}}>
                    <div>{m.label}</div>
                    <div style={{fontWeight:700,color:"#166534",fontSize:11}}>{monthGrandTotal(m.key).toLocaleString()}</div>
                    <div style={{fontWeight:400,color:"#9CA3AF",fontSize:10}}>{weeksInMonth(m.key,year).toFixed(1)} wks</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customersToShow.map(customer=>{
                const custTotal=visMonths.reduce((t,m)=>{
                  dist.products.forEach(p=>{
                    const v=forecasts[key(customer,p.sku,m.key)];
                    if(filterRep==="All"||v?.rep===filterRep){const fc=calcForecast(v);if(fc)t+=fc.total;}
                  });return t;
                },0);
                const customerProducts=dist.products.filter(p=>
                  visMonths.some(m=>{
                    const v=forecasts[key(customer,p.sku,m.key)];
                    const fc=calcForecast(v);
                    return fc?.total>0&&(filterRep==="All"||v?.rep===filterRep);
                  })
                );
                if(customerProducts.length===0) return null;
                return(
                  <>
                    <tr key={customer+"_header"} style={{background:"#E8F0E8"}}>
                      <td colSpan={3+visMonths.length} style={{padding:"6px 10px",fontWeight:600,fontSize:13,color:"#166534",borderTop:"2px solid #C6D9C6"}}>
                        {customer}
                        <span style={{marginLeft:10,fontWeight:400,fontSize:12,color:"#4B7A4B"}}>{custTotal.toLocaleString()} units total</span>
                      </td>
                    </tr>
                    {customerProducts.map(prod=>{
                      const skuColor=prod.sku.startsWith("NG-")?"#B91C1C":prod.sku.startsWith("CVS-")?"#1D4ED8":prod.sku.startsWith("GEN-")?"#065F46":"#374151";
                      return(
                        <tr key={customer+prod.sku} style={{borderBottom:"1px solid #F3F4F6"}}
                          onMouseEnter={e=>e.currentTarget.style.background="#F9FAFB"}
                          onMouseLeave={e=>e.currentTarget.style.background=""}>
                          <td style={{...TD,color:"#6B7280",fontSize:11,position:"sticky",left:0,background:"inherit",zIndex:5}}>{customer}</td>
                          <td style={{...TD,color:skuColor,fontWeight:600,position:"sticky",left:120,background:"inherit",zIndex:5}}>{prod.sku}</td>
                          <td style={{...TD,maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",position:"sticky",left:220,background:"inherit",zIndex:5}} title={prod.desc}>{prod.desc}</td>
                          {visMonths.map(m=>{
                            const v=forecasts[key(customer,prod.sku,m.key)];
                            const show=v&&(filterRep==="All"||v.rep===filterRep);
                            const fc=calcForecast(show?v:null);
                            const inherited=getInheritedStores(forecasts,dist.name,prod.sku,customer,year,m.key);
                            const hasPromo=fc&&(fc.liftUnits>0||fc.liftFlat>0);
                            return(
                              <td key={m.key} style={{...TD,borderLeft:"2px solid #F3F4F6",textAlign:"right",
                                background:!fc?.total?"#fff":hasPromo?"#FAF5FF":"#F0FDF4"}}>
                                {fc?.total>0?(
                                  <div>
                                    <div style={{fontWeight:700,fontSize:13}}>{fc.total.toLocaleString()}</div>
                                    <div style={{fontSize:10,color:"#9CA3AF",marginTop:1}}>
                                      {fc.useManual?<span style={{color:"#6366F1"}}>manual</span>:<>{fc.base.toLocaleString()} base</>}
                                    </div>
                                    {hasPromo&&<div style={{fontSize:10,color:"#7C3AED"}}>+{(fc.liftUnits+fc.liftFlat).toLocaleString()} promo</div>}
                                    {v?.isReset&&<div style={{fontSize:9,color:"#D97706"}}>RESET {v.stores}st</div>}
                                    {v?.conf&&<div style={{fontSize:9,display:"inline-block",background:CS[v.conf]?.bg,color:CS[v.conf]?.c,borderRadius:3,padding:"1px 4px",marginTop:2}}>{v.conf}</div>}
                                    {v?.rep&&<div style={{fontSize:9,color:"#CBD5E1",marginTop:1}}>{v.rep}</div>}
                                  </div>
                                ):<span style={{color:"#E5E7EB"}}>—</span>}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App(){
  const [screen,setScreen]=useState("login");
  const [repName,setRepName]=useState("");
  const [managerInput,setManagerInput]=useState("");
  const [pinError,setPinError]=useState(false);
  const [forecasts,setForecasts]=useState({});
  const [extraCustomers,setExtraCustomers]=useState({});
  const [loading,setLoading]=useState(false);
  const [year,setYear]=useState("2026");
  const [activeDist,setActiveDist]=useState(DISTRIBUTORS[0].name);

  const refresh=useCallback(async()=>{
    setLoading(true);
    const {forecasts:f,extraCustomers:ec}=await loadAll();
    setForecasts(f);setExtraCustomers(ec);setLoading(false);
  },[]);
  useEffect(()=>{if(screen!=="login")refresh();},[screen,refresh]);

  if(screen==="login") return(
    <div style={{minHeight:"100vh",background:"#F9FAFB",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:16,padding:"32px 28px",width:"100%",maxWidth:420}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.12em",color:"#166534",textTransform:"uppercase",marginBottom:6}}>Distributor Forecast</div>
          <h1 style={{fontSize:22,fontWeight:700,margin:0}}>Field Sales Portal</h1>
          <p style={{color:"#9CA3AF",fontSize:13,margin:"6px 0 0"}}>DOT · KEHE · TOPS</p>
        </div>
        <div style={{marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:600,color:"#9CA3AF",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.08em"}}>Select your name</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {REPS.map(r=>(
              <button key={r} onClick={()=>{setRepName(r);setScreen("rep");}}
                style={{background:"#F9FAFB",border:"1px solid #E5E7EB",borderRadius:8,padding:"10px 12px",
                  fontSize:14,fontWeight:500,cursor:"pointer",textAlign:"left",color:"#374151"}}>
                {r}
              </button>
            ))}
          </div>
        </div>
        <div style={{borderTop:"1px solid #F3F4F6",paddingTop:20}}>
          <div style={{fontSize:11,fontWeight:600,color:"#9CA3AF",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.08em"}}>Manager access</div>
          <div style={{display:"flex",gap:8}}>
            <input type="password" placeholder="Enter PIN" value={managerInput}
              onChange={e=>{setManagerInput(e.target.value);setPinError(false);}}
              onKeyDown={e=>{if(e.key==="Enter"){if(managerInput===MANAGER_PIN)setScreen("manager");else setPinError(true);}}}
              style={{flex:1,border:`1px solid ${pinError?"#FCA5A5":"#E5E7EB"}`,borderRadius:8,padding:"8px 12px",fontSize:14}}/>
            <button onClick={()=>{if(managerInput===MANAGER_PIN)setScreen("manager");else setPinError(true);}}
              style={{background:"#166534",color:"#fff",border:"none",borderRadius:8,padding:"8px 18px",fontSize:13,fontWeight:500,cursor:"pointer"}}>
              Enter
            </button>
          </div>
          {pinError&&<div style={{color:"#DC2626",fontSize:12,marginTop:6}}>Incorrect PIN</div>}
          <div style={{fontSize:11,color:"#D1D5DB",marginTop:6}}>Default PIN: mgr2025</div>
        </div>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"#F9FAFB"}}>
      <div style={{background:"#fff",borderBottom:"1px solid #E5E7EB",padding:"0 16px",display:"flex",alignItems:"stretch"}}>
        <div style={{fontWeight:700,fontSize:14,color:"#166534",padding:"12px 16px 12px 0",borderRight:"1px solid #E5E7EB",marginRight:12,display:"flex",alignItems:"center"}}>
          Forecast
        </div>
        {[{id:"rep",label:"Rep Entry"},{id:"manager",label:"Manager View"}].map(tab=>(
          <button key={tab.id} onClick={()=>setScreen(tab.id)}
            style={{background:"none",border:"none",borderBottom:screen===tab.id?"2px solid #166534":"2px solid transparent",
              marginBottom:"-1px",padding:"12px 14px",fontSize:13,fontWeight:screen===tab.id?600:400,
              cursor:"pointer",color:screen===tab.id?"#166534":"#6B7280"}}>
            {tab.label}
          </button>
        ))}
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:10}}>
          {loading&&<span style={{fontSize:12,color:"#9CA3AF"}}>Loading…</span>}
          {screen==="rep"&&<span style={{fontSize:13,fontWeight:500,background:"#F0FDF4",color:"#166534",padding:"3px 10px",borderRadius:20}}>{repName}</span>}
          <button onClick={()=>{setScreen("login");setRepName("");setManagerInput("");}}
            style={{background:"none",border:"1px solid #E5E7EB",borderRadius:6,padding:"5px 12px",fontSize:12,cursor:"pointer",color:"#6B7280"}}>
            Sign out
          </button>
        </div>
      </div>
      <div style={{padding:"0 16px"}}>
        {screen==="rep"&&<RepGrid repName={repName} forecasts={forecasts} setForecasts={setForecasts}
          extraCustomers={extraCustomers} setExtraCustomers={setExtraCustomers}
          year={year} setYear={setYear} activeDist={activeDist} setActiveDist={setActiveDist}/>}
        {screen==="manager"&&<ManagerView forecasts={forecasts} extraCustomers={extraCustomers}
          year={year} setYear={setYear} onRefresh={refresh}/>}
      </div>
    </div>
  );
}
