import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

// *********************************************************************
// Data.date must be provided in ASC order (ascending, oldest to newest)
// *********************************************************************
const LineChart = () => {
 const data_type="campaign_impressions"
 
 let Data = [
    { date: 20220101, impressions: 100 },
    { date: 20220102, impressions: 102 },
    { date: 20220103, impressions: 103 },
    { date: 20220104, impressions: 106 },
    { date: 20220105, impressions: 105 },
    { date: 20220106, impressions: 115 },
    { date: 20220107, impressions: 125 },
    { date: 20220108, impressions: 106 },
    { date: 20220109, impressions: 109 },
    { date: 20220110, impressions: 115 },
    { date: 20220111, impressions: 123 },
    { date: 20220112, impressions: 103 },
    { date: 20220113, impressions: 101 },
    { date: 20220114, impressions: 102 },
    { date: 20220115, impressions: 105 },
    { date: 20220116, impressions: 150 },
    { date: 20220117, impressions: 147 },
    { date: 20220118, impressions: 142 },
    { date: 20220119, impressions: 117 },
    { date: 20220120, impressions: 122 },
    { date: 20220121, impressions: 132 },
    { date: 20220122, impressions: 107 },
    { date: 20220123, impressions: 102 },
    { date: 20220124, impressions: 103 },
    { date: 20220125, impressions: 113 },
    { date: 20220126, impressions: 128 },
    { date: 20220127, impressions: 153 },
    { date: 20220128, impressions: 152 },
    { date: 20220129, impressions: 162 },
    { date: 20220130, impressions: 173 },
    { date: 20220131, impressions: 165 }
  
  // ... truncated but you get it

  ];

  // Element References
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const svgContainer = useRef(null); // The PARENT of the SVG 

  // State to track width and height of SVG Container
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  // This function calculates width and height of the container
  const getSvgContainerSize = () => {
    const newWidth = svgContainer.current.clientWidth;
    setWidth(newWidth);

    const newHeight = svgContainer.current.clientHeight;
    setHeight(newHeight);
    console.log('newHieght: ', svgContainer.current.clientHeight);
  };

  useEffect(() => {
    // detect 'width' and 'height' on render
    getSvgContainerSize();
    // listen for resize changes, and detect dimensions again when they change
    window.addEventListener("resize", getSvgContainerSize);
    // cleanup event listener
    return () => window.removeEventListener("resize", getSvgContainerSize);
  }, []);

  useEffect(() => {
    // D3 Code

    // data_type variables switch
    let xAccessor;
    let yAccessor;
    let yAxisLabel;
    let parseDate;

    // variable accessor depending on datatype
    switch (data_type) {
      case "test":
        parseDate = d3.timeParse("%Y%m%d");
        xAccessor = (d) => parseDate(d.date);
        yAccessor = (d) => d.impressions;
        yAxisLabel = "Test Label";
        break;
      case "campaign_impressions":
        parseDate = d3.timeParse("%Y%m%d");
        xAccessor = (d) => parseDate(d.date);
        yAccessor = (d) => d.impressions;
        yAxisLabel = "Impressions";
        break;
      default:
        throw new Error(`${data_type} is an unknown data_type prop`);
    }

    // Dimensions
    let dimensions = {
      width: width, // width from state
      height: height, // height from state
      margins: 50,
    };

    dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
    dimensions.containerHeight = dimensions.height - dimensions.margins * 2;
    console.log('dimensions: ', dimensions)

    // Selections
    const svg = d3
      .select(svgRef.current)
      .classed("line-chart-svg", true)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);

    // clear all previous content on refresh
    const everything = svg.selectAll("*");
    everything.remove();

    const container = svg
      .append("g")
      .classed("container", true)
      .attr("transform", `translate(${dimensions.margins}, ${dimensions.margins})`);

    const tooltip = d3.select(tooltipRef.current);
    const tooltipDot = container
      .append("circle")
      .classed("tool-tip-dot", true)
      .attr("r", 5)
      .attr("fill", "#fc8781")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .style("opacity", 0)
      .style("pointer-events", "none");

    // Scales
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(Data, yAccessor)])
      .range([dimensions.containerHeight, 0])
      .nice();
      console.log('yScale: ', dimensions.containerHeight)
    const xScale = d3.scaleTime().domain(d3.extent(Data, xAccessor)).range([0, dimensions.containerWidth]);

    // Line Generator
    const lineGenerator = d3
      .line()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)));

    // Draw Line
    container
      .append("path")
      .datum(Data)
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", "#30475e")
      .attr("stroke-width", 2);

    // Axis
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${d}`);

    const yAxisGroup = container.append("g").classed("yAxis", true).call(yAxis);

    // y-axis label
    yAxisGroup
      .append("text")
      .attr("x", -dimensions.containerHeight / 2)
      .attr("y", -dimensions.margins + 10)
      .attr("fill", "black")
      .text(yAxisLabel)
      .style("font-size", ".8rem")
      .style("transform", "rotate(270deg)")
      .style("text-anchor", "middle");

    const xAxis = d3.axisBottom(xScale);

    container
      .append("g")
      .classed("xAxis", true)
      .style("transform", `translateY(${dimensions.containerHeight}px)`)
      .call(xAxis);

    // Tooltip
    container
      .append("rect")
      .classed("mouse-tracker", true)
      .attr("width", dimensions.containerWidth)
      .attr("height", dimensions.containerHeight)
      .style("opacity", 0)
      .on("touchmouse mousemove", function (event) {
        const mousePos = d3.pointer(event, this);

        // x coordinate stored in mousePos index 0
        const date = xScale.invert(mousePos[0]);

        // Custom Bisector - left, center, right
        const dateBisector = d3.bisector(xAccessor).center;

        const bisectionIndex = dateBisector(Data, date);
        //console.log(bisectionIndex);
        // math.max prevents negative index reference error
        const hoveredIndexData = Data[Math.max(0, bisectionIndex)];

        // Update Image
        tooltipDot
          .style("opacity", 1)
          .attr("cx", xScale(xAccessor(hoveredIndexData)))
          .attr("cy", yScale(yAccessor(hoveredIndexData)))
          .raise();

        tooltip
          .style("display", "block")
          .style("top", `${yScale(yAccessor(hoveredIndexData)) - 50}px`)
          .style("left", `${xScale(xAccessor(hoveredIndexData))}px`);

        tooltip.select(".data").text(`${yAccessor(hoveredIndexData)}`);

        const dateFormatter = d3.timeFormat("%B %-d, %Y");

        tooltip.select(".date").text(`${dateFormatter(xAccessor(hoveredIndexData))}`);
      })
      .on("mouseleave", function () {
        tooltipDot.style("opacity", 0);
        tooltip.style("display", "none");
      });
  }, [Data, data_type, width, height]); // redraw chart if data or dimensions change

  return (
    <div ref={svgContainer} className="line-chart">
      <svg ref={svgRef} />
      <div ref={tooltipRef} className="lc-tooltip">
        <div className="data"></div>
        <div className="date"></div>
      </div>
    </div>
  );
};

export default LineChart;