function Tool()
{
  this.layer = 0;
  this.layers = [];
  this.verteces = [];

  this.remove_segment = function()
  {
    this.layers[this.layer].pop();
    this.clear();
    dotgrid.draw();
  }

  this.add_vertex = function(pos)
  {
    this.verteces.push(pos);
    console.log(this.verteces);
  }

  this.cast = function(type)
  {
    if(!this.layers[this.layer]){ this.layers[this.layer] = []; }

    this.layers[this.layer].push({type:type,verteces:this.verteces.slice()})
    this.clear();
    dotgrid.draw();

    console.log(`Casted ${type}+${this.layers[this.layer].length}`);
  }

  this.path = function()
  {
    var html = "";

    for(id in this.layers[this.layer]){
      var segment = this.layers[this.layer][id];
      html += this.render(segment);
    }
    return html
  }

  this.render = function(segment)
  {
    var type = segment.type;
    var verteces = segment.verteces;
    var html = `M${verteces[0].x},${verteces[0].y} `;

    for(id in verteces){
      if(id == 0){ continue; }
      var vertex = verteces[id];
      html += `L${vertex.x},${vertex.y} `;
    }
    
    return html
  }

  this.vertex_at = function(pos)
  {
    for(segment_id in this.layers[this.layer]){
      var segment = this.layers[this.layer][segment_id];
      for(vertex_id in segment.verteces){
        var vertex = segment.verteces[vertex_id];
        if(vertex.x == Math.abs(pos.x) && vertex.y == Math.abs(pos.y)){
          return vertex;
        }
      }
    }
    return null;
  }

  this.translate = function(a,b)
  {
    for(segment_id in this.layers[this.layer]){
      var segment = this.layers[this.layer][segment_id];
      for(vertex_id in segment.verteces){
        var vertex = segment.verteces[vertex_id];
        if(vertex.x == Math.abs(a.x) && vertex.y == Math.abs(a.y)){
          segment.verteces[vertex_id] = {x:Math.abs(b.x),y:Math.abs(b.y)};
        }
      }
    }
    dotgrid.draw();
  }

  this.clear = function()
  {
    this.verteces = [];
  }
}