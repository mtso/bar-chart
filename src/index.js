~function() {
  const d3 = require('d3')
  const config = require('./config')
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

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
    let padding = 80

    let svg = d3.select('body')
        .append('svg')
        .attr('width', size.width)
        .attr('height', size.height)
        .attr('class', 'container')

    svg.append("text")
      .attr("x", (size.width / 2))
      .attr("y", padding * 0.7)
      .attr("text-anchor", "middle")
      .style("font-size", "19px")
      .style("font-weight", "bold")
      .text("Gross Domestic Product");

    svg.append("text")
      .attr("x", (size.width / 2))
      .attr("y", size.height - padding * 0.3)
      .attr("text-anchor", "middle")
      .style("font-size", "15px")
      .text("Quarter");

    svg.append("text")
      .attr("x", (size.width / 2))
      .attr("y", size.height)
      .attr("text-anchor", "middle")
      .style("font-size", "13px")
      .text("Source: http://www.bea.gov/national/pdf/nipaguid.pdf");

    svg.append("text")
      .attr('transform', 'translate(' + -padding * 0.85 + ', ' + (size.height + padding) / 2 + ')rotate(-90)')
      .attr("x", padding)
      .attr("y", padding)
      .attr("text-anchor", "middle")
      .style("font-size", "15px")
      .text("Billions of Dollars");

    let minDate = d3.min(data, d => d.date)
    let maxDate = d3.max(data, d => d.date)
    let xScale = d3.scaleLinear()
                   .domain([minDate, maxDate])
                   .range([padding, size.width - padding])

    let yScale = d3.scaleLinear()
                   .domain([d3.min(data, d => d.gdp), d3.max(data, d => d.gdp)])
                   .range([size.height - padding , padding])

    let xScaleAxis = d3.scaleLinear()
                   .domain([minDate.getFullYear(), maxDate.getFullYear()])
                   .range([padding, size.width - padding])

    let xAxis = d3.axisBottom(xScaleAxis)
    let yAxis = d3.axisLeft(yScale)

    var tt;

    let ttsize = {
      width: 100,
      height: 40
    }

    svg.append('g')
      .attr('transform', 'translate(0, ' + (size.height - padding * 0.8) + ')')
      .call(xAxis)

    svg.append('g')
      .attr('transform', 'translate(' + padding * 0.8 + ', 0)')
      .call(yAxis)

    let bars = svg.selectAll('rect')
       .data(data)
       .enter()
       .append('rect')

       .attr('width', (size.width - padding * 2) / data.length)
       .attr('height', d => size.height - yScale(d.gdp) - padding)
       .attr('x', d => xScale(d.date))
       .attr('y', d => yScale(d.gdp))
       .attr('class', 'bar')


       .on('mouseover', (d) => {
         tt = svg.append('g')

         let gdpText = '$' + d.gdp + 'B'
         let quarterText = months[d.date.getUTCMonth()] + ' ' + d.date.getFullYear()
         let tooltipWidth = Math.max(gdpText.length, quarterText.length) * 10

         tt.append('rect')
           .attr('x', xScale(d.date))
           .attr('y', yScale(d.gdp) - ttsize.height)
           .attr('width', tooltipWidth)
           .attr('height', 40)
           .attr('fill', 'black')

         tt.append('text')
           .text(gdpText)
           .attr('x', xScale(d.date) + 5)
           .attr('y', yScale(d.gdp) - ttsize.height * 0.6)
           .attr('fill', 'white')

         tt.append('text')
           .text(quarterText)
           .attr('x', xScale(d.date) + 5)
           .attr('y', yScale(d.gdp) - ttsize.height * 0.2)
           .attr('fill', 'white')
       })
       .on('mouseout', d => {
         tt.remove()
       })
  }

  var req = new XMLHttpRequest()
  req.addEventListener('load', display)
  req.open('GET', config.dataUrl)
  req.send()
}()
