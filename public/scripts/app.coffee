#global jQuery

#!
#* FitText.js 1.1
#*
#* Copyright 2011, Dave Rupert http://daverupert.com
#* Released under the WTFPL license
#* http://sam.zoy.org/wtfpl/
#*
#* Date: Thu May 05 14:23:00 2011 -0600
#
(($) ->
  $.fn.fitText = (kompressor, options) ->

    # Setup options
    compressor = kompressor or 1
    settings = $.extend(
      minFontSize: Number.NEGATIVE_INFINITY
      maxFontSize: Number.POSITIVE_INFINITY
    , options)
    @each ->

      # Store the object
      $this = $(this)

      # Resizer() resizes items based on the object width divided by the compressor * 10
      resizer = ->
        $this.css "font-size", Math.max(Math.min($this.width() / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize))


      # Call once to set.
      resizer()

      # Call on resize. Opera debounces their resize by default.
      $(window).on "resize", resizer

) jQuery

#global jQuery

#jshint multistr:true browser:true

#!
#* FitVids 1.0
#*
#* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
#* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
#* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
#*
#* Date: Thu Sept 01 18:00:00 2011 -0500
#
(($) ->
  "use strict"
  $.fn.fitVids = (options) ->
    settings = customSelector: null
    div = document.createElement("div")
    ref = document.getElementsByTagName("base")[0] or document.getElementsByTagName("script")[0]
    div.className = "fit-vids-style"
    div.innerHTML = "&shy;<style>               .fluid-width-video-wrapper {                 width: 100%;                              position: relative;                       padding: 0;                            }                                                                                   .fluid-width-video-wrapper iframe,        .fluid-width-video-wrapper object,        .fluid-width-video-wrapper embed {           position: absolute;                       top: 0;                                   left: 0;                                  width: 100%;                              height: 100%;                          }                                       </style>"
    ref.parentNode.insertBefore div, ref
    $.extend settings, options  if options
    @each ->
      selectors = ["iframe[src*='player.vimeo.com']", "iframe[src*='www.youtube.com']", "iframe[src*='www.youtube-nocookie.com']", "iframe[src*='www.kickstarter.com']", "object", "embed"]
      selectors.push settings.customSelector  if settings.customSelector
      $allVideos = $(this).find(selectors.join(","))
      $allVideos.each ->
        $this = $(this)
        return  if @tagName.toLowerCase() is "embed" and $this.parent("object").length or $this.parent(".fluid-width-video-wrapper").length
        height = (if (@tagName.toLowerCase() is "object" or ($this.attr("height") and not isNaN(parseInt($this.attr("height"), 10)))) then parseInt($this.attr("height"), 10) else $this.height())
        width = (if not isNaN(parseInt($this.attr("width"), 10)) then parseInt($this.attr("width"), 10) else $this.width())
        aspectRatio = height / width
        unless $this.attr("id")
          videoID = "fitvid" + Math.floor(Math.random() * 999999)
          $this.attr "id", videoID
        $this.wrap("<div class=\"fluid-width-video-wrapper\"></div>").parent(".fluid-width-video-wrapper").css "padding-top", (aspectRatio * 100) + "%"
        $this.removeAttr("height").removeAttr "width"


) jQuery

window.FE = {

  #-----------------------------------------------------------------------
  #  fitText
  #-----------------------------------------------------------------------

  fit: ->
    $(".fit-03").fitText 0.3
    $(".fit-045").fitText 0.45
    $(".fit-06").fitText 0.6
    $(".fit-07").fitText 0.7
    $(".fit-08").fitText 0.8
    $(".fit-09").fitText 0.9
    $(".fit-009").fitText 0.09
    $(".fit-11").fitText 1.1
    $(".fit-16").fitText 1.6
    $(".fit-23").fitText 2.3
    $(".fit-25").fitText 2.5
    $(".fit-4").fitText 4

  #-----------------------------------------------------------------------
  #  Character Swap
  #-----------------------------------------------------------------------

  swap: ->
    $(".stage-character").click ->
      $(".stage-character, .stage-info").removeClass "is--active"
      $(this).addClass "is--active"
      $(this).next("p").addClass "is--active"

  #-----------------------------------------------------------------------
  #  Nav Toggle
  #-----------------------------------------------------------------------

  navToggle: ->
    $(".nav--trigger, nav a").click ->
      $(".nav--toggle").toggleClass "is--active"

  #-----------------------------------------------------------------------
  #  Tyler Patch (fixes site links with no http)
  #-----------------------------------------------------------------------

  tylerPatch: ->
    $(".attendee-website a:not([href^=\"http://\"]):not([href^=\"https://\"])").each ->
      $(this).attr "href", "http://" + $(this).attr("href")

  #-----------------------------------------------------------------------
  #  Content Show
  #-----------------------------------------------------------------------

  contentToggle: ->
    $(".show--trigger").click ->
      $(this).toggleClass "is-showing"
      $(".show--content").toggleClass "is-hidden"

}

#-----------------------------------------------------------------------
#  Dom Ready
#-----------------------------------------------------------------------

jQuery ($) ->
  FE.fit()
  FE.swap()
  FE.navToggle()
  FE.tylerPatch()
  FE.contentToggle()
  $(".video-wrapper").fitVids()
