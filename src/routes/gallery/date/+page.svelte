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
	import Demo from '$playground/Demo.svelte';
	import DemoGrid from '$playground/DemoGrid.svelte';
</script>

<h1>Date &amp; time</h1>

<p class="lede">
	The compound components. Every one of them is a grid or a segmented field, which is exactly where
	each era differs most - so they are rendered here as the stage 2 target list rather than styled
	generically now.
</p>

<DemoGrid>
	<Demo title="Calendar" unstyled>
		<Calendar.Root type="single" weekdayFormat="short" fixedWeeks>
			{#snippet children({ months, weekdays })}
				<Calendar.Header>
					<Calendar.PrevButton>‹</Calendar.PrevButton>
					<Calendar.Heading />
					<Calendar.NextButton>›</Calendar.NextButton>
				</Calendar.Header>
				{#each months as month (month.value)}
					<Calendar.Grid>
						<Calendar.GridHead>
							<Calendar.GridRow>
								{#each weekdays as day (day)}
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

	<Demo title="Range calendar" unstyled>
		<RangeCalendar.Root weekdayFormat="short" fixedWeeks>
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
								{#each weekdays as day (day)}
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

	<Demo title="Date field" unstyled>
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

	<Demo title="Date range field" unstyled>
		<DateRangeField.Root>
			<DateRangeField.Label>Between</DateRangeField.Label>
			<DateRangeField.Input type="start">
				{#snippet children({ segments })}
					{#each segments as segment, index (index)}
						<DateRangeField.Segment part={segment.part}>{segment.value}</DateRangeField.Segment>
					{/each}
				{/snippet}
			</DateRangeField.Input>
			<DateRangeField.Input type="end">
				{#snippet children({ segments })}
					{#each segments as segment, index (index)}
						<DateRangeField.Segment part={segment.part}>{segment.value}</DateRangeField.Segment>
					{/each}
				{/snippet}
			</DateRangeField.Input>
		</DateRangeField.Root>
	</Demo>

	<Demo title="Time field" unstyled>
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

	<Demo title="Time range field" unstyled>
		<TimeRangeField.Root>
			<TimeRangeField.Label>Uptime</TimeRangeField.Label>
			<TimeRangeField.Input type="start">
				{#snippet children({ segments })}
					{#each segments as segment, index (index)}
						<TimeRangeField.Segment part={segment.part}>{segment.value}</TimeRangeField.Segment>
					{/each}
				{/snippet}
			</TimeRangeField.Input>
			<TimeRangeField.Input type="end">
				{#snippet children({ segments })}
					{#each segments as segment, index (index)}
						<TimeRangeField.Segment part={segment.part}>{segment.value}</TimeRangeField.Segment>
					{/each}
				{/snippet}
			</TimeRangeField.Input>
		</TimeRangeField.Root>
	</Demo>

	<Demo title="Date picker" unstyled>
		<DatePicker.Root>
			<DatePicker.Label>Pick a date</DatePicker.Label>
			<DatePicker.Input>
				{#snippet children({ segments })}
					{#each segments as segment, index (index)}
						<DatePicker.Segment part={segment.part}>{segment.value}</DatePicker.Segment>
					{/each}
					<DatePicker.Trigger>📅</DatePicker.Trigger>
				{/snippet}
			</DatePicker.Input>
			<DatePicker.Content>
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
										{#each weekdays as day (day)}
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

	<Demo title="Date range picker" unstyled>
		<DateRangePicker.Root>
			<DateRangePicker.Label>Pick a range</DateRangePicker.Label>
			<DateRangePicker.Input type="start">
				{#snippet children({ segments })}
					{#each segments as segment, index (index)}
						<DateRangePicker.Segment part={segment.part}>{segment.value}</DateRangePicker.Segment>
					{/each}
				{/snippet}
			</DateRangePicker.Input>
			<DateRangePicker.Trigger>📅</DateRangePicker.Trigger>
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
