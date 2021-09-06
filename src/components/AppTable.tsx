import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { fade } from "@material-ui/core/styles/colorManipulator";
import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/orange";
import cyan from "@material-ui/core/colors/cyan";
import red from "@material-ui/core/colors/red";
import { Typography } from "@material-ui/core";

interface Props {
  columns: any[];
  rows: any[];
  classSetter?: any;
  paginate?: boolean;
  title?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 440,
    },
    textGreen: {
      margin: "5px",
      color: green[500],
      "&:hover": {
        backgroundColor: fade(green[500], theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
    },
    outlinedGreen: {
      border: `1px solid ${fade(green[500], 0.5)}`,
      "&:hover": {
        border: `1px solid ${green[500]}`,
      },
      // Disabled styles for outlined button...
      // NOTE: You need to pass `classes={{disabled: classes.diabled}}` to
      // the Button component for these styles to work. You also need have
      // a .disabled class in your style rules.
      "&$disabled": {
        border: `1px solid ${theme.palette.action.disabled}`,
      },
    },
    containedGreen: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: green[500],
        },
      },
    },
    // orange
    textOrange: {
      margin: "5px",
      color: orange[500],
      "&:hover": {
        backgroundColor: fade(orange[500], theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
    },
    outlinedOrange: {
      border: `1px solid ${fade(orange[500], 0.5)}`,
      "&:hover": {
        border: `1px solid ${orange[500]}`,
      },
      // Disabled styles for outlined button...
      // NOTE: You need to pass `classes={{disabled: classes.diabled}}` to
      // the Button component for these styles to work. You also need have
      // a .disabled class in your style rules.
      "&$disabled": {
        border: `1px solid ${theme.palette.action.disabled}`,
      },
    },
    containedOrange: {
      color: theme.palette.getContrastText(orange[500]),
      backgroundColor: orange[500],
      "&:hover": {
        backgroundColor: orange[700],
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: orange[500],
        },
      },
    },
    // cyan
    textCyan: {
      margin: "5px",
      color: cyan[500],
      "&:hover": {
        backgroundColor: fade(cyan[500], theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
    },
    outlinedCyan: {
      border: `1px solid ${fade(cyan[500], 0.5)}`,
      "&:hover": {
        border: `1px solid ${cyan[500]}`,
      },
      // Disabled styles for outlined button...
      // NOTE: You need to pass `classes={{disabled: classes.diabled}}` to
      // the Button component for these styles to work. You also need have
      // a .disabled class in your style rules.
      "&$disabled": {
        border: `1px solid ${theme.palette.action.disabled}`,
      },
    },
    containedCyan: {
      color: theme.palette.getContrastText(cyan[500]),
      backgroundColor: cyan[500],
      "&:hover": {
        backgroundColor: cyan[700],
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: cyan[500],
        },
      },
    },
    // red
    textRed: {
      margin: "5px",
      color: red[500],
      "&:hover": {
        backgroundColor: fade(red[500], theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
    },
    outlinedRed: {
      border: `1px solid ${fade(red[500], 0.5)}`,
      "&:hover": {
        border: `1px solid ${red[500]}`,
      },
      // Disabled styles for outlined button...
      // NOTE: You need to pass `classes={{disabled: classes.diabled}}` to
      // the Button component for these styles to work. You also need have
      // a .disabled class in your style rules.
      "&$disabled": {
        border: `1px solid ${theme.palette.action.disabled}`,
      },
    },
    containedRed: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
      "&:hover": {
        backgroundColor: red[700],
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: red[500],
        },
      },
    },
  })
);

export default function AppTable({
  columns,
  rows,
  classSetter,
  paginate = true,
  title,
}: Props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (classSetter) {
      classSetter(classes);
    }
  }, [classes]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      {columns && rows ? (
        <Paper className={classes.root} elevation={15}>
          {title && (
            <Typography
              align="center"
              style={{ paddingTop: "10px", paddingBottom: "10px" }}
            >
              {title}
            </Typography>
          )}
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {paginate && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      ) : null}
    </div>
  );
}
