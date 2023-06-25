export default (name = Date.now()) => `
<div class="ping-box">
<hr>            
<h4>Host name:</h4>
<div class="row host-box">
  <input type="text" value="192.168.0.1" class="form-control host-text">
</div>
<hr>            
<h4>Timeout:</h4>
<div class="row timeout-box">
  <input type="text" value="100" class="form-control timeout-text">
</div>
<hr>            
<h4>Period:</h4>
<div class="row period-box">
  <input type="text" value="1000" class="form-control period-text">
</div>
<hr>
<div class="row">
  <button class="btn remove-ping-btn">X</button>
</div>
</div>
`