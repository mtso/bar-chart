~function() {
  const d3 = require('d3')
  const config = require('./config')
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
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
    let padding = 40

    let svg =
      d3.select('body')
        .append('svg')
        .attr('width', size.width)
        .attr('height', size.height)
        .attr('class', 'container')

    let minDate = d3.min(data, d => d.date)
    let maxDate = d3.max(data, d => d.date)
    let xScale = d3.scaleLinear()
                   .domain([minDate, maxDate])
                   .range([padding, size.width - padding * 3])

    let yScale = d3.scaleLinear()
                   .domain([d3.min(data, d => d.gdp), d3.max(data, d => d.gdp)])
                   .range([size.height - padding , padding * 3])

    let xScaleAxis = d3.scaleLinear()
                   .domain([minDate.getFullYear(), maxDate.getFullYear()])
                   .range([padding, size.width - padding * 3])

    let xAxis = d3.axisBottom(xScaleAxis)
    let yAxis = d3.axisLeft(yScale)

    var tt;

    let ttsize = {
      width: 100,
      height: 40
    }

    svg.append('g')
      .attr('transform', 'translate(0, ' + (size.height - padding) + ')')
      .call(xAxis)

    svg.append('g')
      .attr('transform', 'translate(' + padding + ', 0)')
      .call(yAxis)

    let bars = svg.selectAll('rect')
       .data(data)
       .enter()
       .append('rect')

       .attr('width', (size.width - padding * 2) / data.length)
       .attr('height', d => size.height - yScale(d.gdp))
       .attr('x', d => xScale(d.date))
       .attr('y', d => yScale(d.gdp) - padding)
       .attr('class', 'bar')


       .on('mouseover', (d) => {
         tt = svg.append('g')

         tt.append('rect')
           .attr('x', xScale(d.date))
           .attr('y', yScale(d.gdp) - padding * 2)
           .attr('width', 100)
           .attr('height', 40)
           .attr('fill', 'black')

         tt.append('text')
           .text(d.gdp)
           .attr('x', xScale(d.date) + 5)
           .attr('y', yScale(d.gdp) - 24 - padding)
           .attr('fill', 'white')

         tt.append('text')
           .text(d.date.getFullYear())
           .attr('x', xScale(d.date) + 5)
           .attr('y', yScale(d.gdp) - 10 - padding)
           .attr('fill', 'white')
       })
       .on('mouseout', d => {
         tt.remove()
       })

      //  .append('svg:title')
      //  .text(d => 'GDP: ' + d.gdp + ' Billion\n' + months[d.date.getMonth()] + ' ' + d.date.getFullYear())


      //  .on('mouseover', (d) => {
      //    tt = svg.append('svg:title')
      //      .text(d.gdp + '\n' + d.date.getFullYear())
      //   //  tt = d3.select('body')
      //   //    .append('div')
      //   //
      //   //  tt = svg
      //   //    .append('rect')
      //   //    .attr('width', ttsize.width)
      //   //    .attr('height', ttsize.height)
      //   //    .attr('fill', 'gray')
      //   //    .attr('x', xScale(d.date))
      //   //    .attr('y', yScale(d.gdp) - 100 + 2)
       //
       //
      //     //  .attr('opacity', 0.3)
      //   //  tt
      //   //    .append('text')
      //   //    .text(d.gdp + '\n' + d.date.getFullYear())
      //   //    .attr('fill', 'red')
      //   //    .attr('font-size', '60px')
      //   //   //  .attr('fill', 'white')
      //   //   //  .attr('class', 'tooltip-text')
      //   //   //  .append('rect')
      //   //   // //  .attr('fill', 'black')
      //   //   //  .append('text')
      //   //   //  .text(d.gdp + '\n' + d.date.getFullYear())
      //   //   //  .attr('x', xScale(d.date))
      //   //   //  .attr('y', yScale(d.gdp))
      //    //
      //    //
      //   //   //  .attr('font-color', 'white')
      //   //   //  .select('body')
      //   //   //  .select()
      //   //   // svg
      //   //   //  .append('div')
      //   //   //
      //   //   //  .style('left', xScale(d.date) + 8 + 'px')
      //   //   //  .style('top', (yScale(d.gdp) - 46) + 'px')
      //   //   //  .attr('class', 'tooltip')
      //   //   //  .html(d.gdp + '<br>' + d.date.getFullYear())
      //  })
      //  .on('mouseout', () => {
      //    tt.remove()
      //  })
  }

  var req = new XMLHttpRequest()
  req.addEventListener('load', display)
  req.open('GET', config.dataUrl)
  req.send()
}()
