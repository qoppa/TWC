/** These options should not be set here and should be overridden with "new Twc.Calendar.Options()"
  * @class
  * @author McGowan
  */
Twc.Calendar.Options = function() {
	return {

		/** Force Calendar to use date provided as the current date.  This overrides users' computer clock
		  * @type String "YYYYMMDD"
		  */
		dateToday : Twc.Util.getDateInt(new Date()),

		/** Don't allow navigation previous months relative to dateToday
		  * @type Boolean
		  */
		excludePreviousMonthNav : 0,

		/** Restrict date selections to those available. 
		  * @type Boolean
		  */
		restrictToDatesAvailable : 0,

		/** should have keys like YYYYMMDD and a boolean value at a minimum.  value is not used.
		  */
		datesAvailable : {},

		/** All users to navigate past the last available date?
		  * @type Boolean
		  */
		restrictToLastDateAvailable : 0,

		/** Provide YYYYMMDD to restrict navigation.  Pre-pouplated for performance and iteration prevention
		  */
		lastDateAvailable : null,


		/** callback for when users select date. see {@link Twc.Calendar} for what is passed
		  */
		onDateSelect : null,

		/** top padding between top of calendar and bottom of text box
		  * @type Number
		  */
		topPadding: 2,

		/**
		  * jQuery selector to which we'll append the calendar elements.  Increase specificity to position
		  * within a div that maintains position on page height/width changes.
		  */
		appendToSelector: 'body'
	}
}