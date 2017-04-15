~function() {
  const d3 = require('d3')
  const config = require('./config')

  function display() {
    let gdp = JSON.parse(this.responseText)
    let data = gdp.data
    data = data.map(d => {
      return {
        date: new Date(d[0]),
        gdp: d[1],
      }
    })

    let size = {
      width: 1000,
      height: 600,
    }
    let padding = 30

    let svg =
      d3.select('body')
        .append('svg')
        .attr('width', size.width)
        .attr('height', size.height)
        .attr('class', 'container')

    // var tt = svg.append('text')
    //             .attr('class', 'tooltip')

    let minDate = d3.min(data, d => d.date)
    let maxDate = d3.max(data, d => d.date)
    let xScale = d3.scaleLinear()
                   .domain([minDate, maxDate])
                   .range([padding, size.width - padding])

    let yScale = d3.scaleLinear()
                   .domain([d3.min(data, d => d.gdp), d3.max(data, d => d.gdp)])
                   .range([size.height - padding, padding])

    var tt;
    // let tt = d3.select('body')
    //   .append('div')

    let bars = svg.selectAll('rect')
       .data(data)
       .enter()
       .append('rect')

       .attr('width', (size.width - padding * 2) / data.length)
       .attr('height', d => d.gdp)
       .attr('x', d => xScale(d.date))
       .attr('y', d => yScale(d.gdp))
       .attr('class', 'bar')
       .on('mouseover', (d) => {
         tt = d3
           .select('body')
           .append('div')
           .style('left', xScale(d.date) + 'px')
           .style('top', yScale(d.gdp) + 'px')
           .attr('class', 'tooltip')
           .html(d.gdp + '<br>' + d.date.getFullYear())
          //  .text(d.gdp + d.date)
        //  tt = svg
        //    .append('text')
        //    .attr('class', 'tooltip')
        //    .text(d.gdp)
        //
        //  tt.attr('x', xScale(d.date))
        //    .attr('y', yScale(d.gdp))
       })
       .on('mouseout', () => {
         tt.remove()
       })
  }

  var req = new XMLHttpRequest()
  req.addEventListener('load', display)
  req.open('GET', config.dataUrl)
  req.send()
}()
