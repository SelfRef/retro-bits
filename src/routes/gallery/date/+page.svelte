<script lang="ts">
	import {
		Calendar,
		DateField,
		DatePicker,
		DateRangeField,
		DateRangePicker,
		RangeCalendar,
		TimeField,
		TimeRangeField
	} from 'bits-ui';
	import type { DateValue } from '@internationalized/date';
	import Demo from '$playground/Demo.svelte';
	import DemoGrid from '$playground/DemoGrid.svelte';

	const ends = ['start', 'end'] as const;
	// Every 13th is unavailable, so the state shows up whatever the month.
	const isDateUnavailable = (date: DateValue) => date.day === 13;
</script>

<h1>Date &amp; time</h1>

<p class="lede">
	Calendars mark today, the selection, a range and its preview, days outside the month and
	unavailable days (every 13th here). Fields are a well of focusable segments.
</p>

<DemoGrid>
	<Demo title="Calendar" note="With month and year selects instead of a heading.">
		<Calendar.Root type="single" weekdayFormat="short" fixedWeeks {isDateUnavailable}>
			{#snippet children({ months, weekdays })}
				<Calendar.Header>
					<Calendar.PrevButton>‹</Calendar.PrevButton>
					<Calendar.MonthSelect />
					<Calendar.YearSelect />
					<Calendar.NextButton>›</Calendar.NextButton>
				</Calendar.Header>
				{#each months as month (month.value)}
					<Calendar.Grid>
						<Calendar.GridHead>
							<Calendar.GridRow>
								{#each weekdays as day, index (index)}
									<Calendar.HeadCell>{day}</Calendar.HeadCell>
								{/each}
							</Calendar.GridRow>
						</Calendar.GridHead>
						<Calendar.GridBody>
							{#each month.weeks as week, index (index)}
								<Calendar.GridRow>
									{#each week as date (date)}
										<Calendar.Cell {date} month={month.value}>
											<Calendar.Day />
										</Calendar.Cell>
									{/each}
								</Calendar.GridRow>
							{/each}
						</Calendar.GridBody>
					</Calendar.Grid>
				{/each}
			{/snippet}
		</Calendar.Root>
	</Demo>

	<Demo title="Range calendar" note="Pick a start, then hover to preview the range.">
		<RangeCalendar.Root weekdayFormat="short" fixedWeeks {isDateUnavailable}>
			{#snippet children({ months, weekdays })}
				<RangeCalendar.Header>
					<RangeCalendar.PrevButton>‹</RangeCalendar.PrevButton>
					<RangeCalendar.Heading />
					<RangeCalendar.NextButton>›</RangeCalendar.NextButton>
				</RangeCalendar.Header>
				{#each months as month (month.value)}
					<RangeCalendar.Grid>
						<RangeCalendar.GridHead>
							<RangeCalendar.GridRow>
								{#each weekdays as day, index (index)}
									<RangeCalendar.HeadCell>{day}</RangeCalendar.HeadCell>
								{/each}
							</RangeCalendar.GridRow>
						</RangeCalendar.GridHead>
						<RangeCalendar.GridBody>
							{#each month.weeks as week, index (index)}
								<RangeCalendar.GridRow>
									{#each week as date (date)}
										<RangeCalendar.Cell {date} month={month.value}>
											<RangeCalendar.Day />
										</RangeCalendar.Cell>
									{/each}
								</RangeCalendar.GridRow>
							{/each}
						</RangeCalendar.GridBody>
					</RangeCalendar.Grid>
				{/each}
			{/snippet}
		</RangeCalendar.Root>
	</Demo>

	<Demo title="Date field">
		<DateField.Root>
			<DateField.Label>Released</DateField.Label>
			<DateField.Input>
				{#snippet children({ segments })}
					{#each segments as segment, index (index)}
						<DateField.Segment part={segment.part}>{segment.value}</DateField.Segment>
					{/each}
				{/snippet}
			</DateField.Input>
		</DateField.Root>
	</Demo>

	<Demo title="Date range field">
		<DateRangeField.Root>
			<DateRangeField.Label>Between</DateRangeField.Label>
			{#each ends as type (type)}
				<DateRangeField.Input {type}>
					{#snippet children({ segments })}
						{#each segments as segment, index (index)}
							<DateRangeField.Segment part={segment.part}>{segment.value}</DateRangeField.Segment>
						{/each}
					{/snippet}
				</DateRangeField.Input>
			{/each}
		</DateRangeField.Root>
	</Demo>

	<Demo title="Time field">
		<TimeField.Root>
			<TimeField.Label>Boot</TimeField.Label>
			<TimeField.Input>
				{#snippet children({ segments })}
					{#each segments as segment, index (index)}
						<TimeField.Segment part={segment.part}>{segment.value}</TimeField.Segment>
					{/each}
				{/snippet}
			</TimeField.Input>
		</TimeField.Root>
	</Demo>

	<Demo title="Time range field">
		<TimeRangeField.Root>
			<TimeRangeField.Label>Uptime</TimeRangeField.Label>
			{#each ends as type (type)}
				<TimeRangeField.Input {type}>
					{#snippet children({ segments })}
						{#each segments as segment, index (index)}
							<TimeRangeField.Segment part={segment.part}>{segment.value}</TimeRangeField.Segment>
						{/each}
					{/snippet}
				</TimeRangeField.Input>
			{/each}
		</TimeRangeField.Root>
	</Demo>

	<Demo title="Date picker" note="The trigger sits inside the field and drops its button chrome.">
		<DatePicker.Root {isDateUnavailable}>
			<DatePicker.Label>Pick a date</DatePicker.Label>
			<DatePicker.Input>
				{#snippet children({ segments })}
					{#each segments as segment, index (index)}
						<DatePicker.Segment part={segment.part}>{segment.value}</DatePicker.Segment>
					{/each}
					<DatePicker.Trigger aria-label="Open calendar">▾</DatePicker.Trigger>
				{/snippet}
			</DatePicker.Input>
			<DatePicker.Content sideOffset={8}>
				<DatePicker.Calendar>
					{#snippet children({ months, weekdays })}
						<DatePicker.Header>
							<DatePicker.PrevButton>‹</DatePicker.PrevButton>
							<DatePicker.Heading />
							<DatePicker.NextButton>›</DatePicker.NextButton>
						</DatePicker.Header>
						{#each months as month (month.value)}
							<DatePicker.Grid>
								<DatePicker.GridHead>
									<DatePicker.GridRow>
										{#each weekdays as day, index (index)}
											<DatePicker.HeadCell>{day}</DatePicker.HeadCell>
										{/each}
									</DatePicker.GridRow>
								</DatePicker.GridHead>
								<DatePicker.GridBody>
									{#each month.weeks as week, index (index)}
										<DatePicker.GridRow>
											{#each week as date (date)}
												<DatePicker.Cell {date} month={month.value}>
													<DatePicker.Day />
												</DatePicker.Cell>
											{/each}
										</DatePicker.GridRow>
									{/each}
								</DatePicker.GridBody>
							</DatePicker.Grid>
						{/each}
					{/snippet}
				</DatePicker.Calendar>
			</DatePicker.Content>
		</DatePicker.Root>
	</Demo>

	<Demo title="Date range picker">
		<DateRangePicker.Root {isDateUnavailable}>
			<DateRangePicker.Label>Pick a range</DateRangePicker.Label>
			{#each ends as type (type)}
				<DateRangePicker.Input {type}>
					{#snippet children({ segments })}
						{#each segments as segment, index (index)}
							<DateRangePicker.Segment part={segment.part}>{segment.value}</DateRangePicker.Segment>
						{/each}
						{#if type === 'end'}
							<DateRangePicker.Trigger aria-label="Open calendar">▾</DateRangePicker.Trigger>
						{/if}
					{/snippet}
				</DateRangePicker.Input>
			{/each}
			<DateRangePicker.Content sideOffset={8}>
				<DateRangePicker.Calendar>
					{#snippet children({ months, weekdays })}
						<DateRangePicker.Header>
							<DateRangePicker.PrevButton>‹</DateRangePicker.PrevButton>
							<DateRangePicker.Heading />
							<DateRangePicker.NextButton>›</DateRangePicker.NextButton>
						</DateRangePicker.Header>
						{#each months as month (month.value)}
							<DateRangePicker.Grid>
								<DateRangePicker.GridHead>
									<DateRangePicker.GridRow>
										{#each weekdays as day, index (index)}
											<DateRangePicker.HeadCell>{day}</DateRangePicker.HeadCell>
										{/each}
									</DateRangePicker.GridRow>
								</DateRangePicker.GridHead>
								<DateRangePicker.GridBody>
									{#each month.weeks as week, index (index)}
										<DateRangePicker.GridRow>
											{#each week as date (date)}
												<DateRangePicker.Cell {date} month={month.value}>
													<DateRangePicker.Day />
												</DateRangePicker.Cell>
											{/each}
										</DateRangePicker.GridRow>
									{/each}
								</DateRangePicker.GridBody>
							</DateRangePicker.Grid>
						{/each}
					{/snippet}
				</DateRangePicker.Calendar>
			</DateRangePicker.Content>
		</DateRangePicker.Root>
	</Demo>
</DemoGrid>

<style>
	.lede {
		max-width: 60ch;
		margin-bottom: var(--rb-space-6);
		color: var(--rb-text-muted);
	}
</style>
