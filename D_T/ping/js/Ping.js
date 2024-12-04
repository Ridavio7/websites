export default (name = Date.now()) => `
<div class="ping-box"> 
<div class="row">
  <button class="btn remove-ping-btn">X</button>
</div>         
<h4>Host name:</h4>
<div class="host-box">
  <input type="text" placeholder="192.168.0.1" value="192.168.0.1" class="form-control host-text">
</div>
<hr>            
<h4>Timeout:</h4>
<div class="timeout-box">
  <input type="text" placeholder="100" value="100" class="form-control timeout-text">
</div>
<hr>            
<h4>Period:</h4>
<div class="period-box">
  <input type="text" placeholder="1000" value="1000" class="form-control period-text">
</div>
<hr>
</div>
`